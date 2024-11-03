import React from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useState, useCallback } from "react";
import { toast } from "sonner";
import VoiceChatOverlay from './voice-chat-overlay';
import { usePersona } from "@/contexts/persona-context";
import { useParams } from 'next/navigation';

class WebSocketManager {
  private ws: WebSocket | null = null;
  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioContext: AudioContext | null = null;
  private isProcessingAudio = false;
  private personaId: string;

  constructor(personaId: string) {
    this.personaId = personaId;
    console.log('WebSocketManager initialized with persona_id:', personaId);
  }

  async startMicrophone() {
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 16000
        } 
      });
      
      this.audioContext = new AudioContext();
      return true;
    } catch (error: unknown) {
      console.error('Microphone access error:', error);
      if (error instanceof Error) {
        toast.error(`Microphone error: ${error.message}`);
      } else {
        toast.error('Failed to access microphone');
      }
      return false;
    }
  }

  private async setupAudioRecording() {
    if (!this.mediaStream) return;

    try {
      this.mediaRecorder = new MediaRecorder(this.mediaStream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      this.mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && this.ws?.readyState === WebSocket.OPEN) {
          const base64Audio = await this.blobToBase64(event.data);
          
          const message = {
            persona_id: this.personaId,
            format: "base64",
            audio: base64Audio,
            metadata: {}
          };

          this.ws.send(JSON.stringify(message));
          console.log('Audio sent to persona:', this.personaId);
        }
      };

      // Start recording in small chunks
      this.mediaRecorder.start(250); // Adjust chunk size if needed
    } catch (error) {
      console.error('Error setting up audio:', error);
    }
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URL prefix
          const base64 = reader.result.split(',')[1];
          resolve(base64);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private getJwtToken(): string | null {
    const cookies = document.cookie.split(';');
    const jwtCookie = cookies.find(cookie => cookie.trim().startsWith('jwt='));
    if (jwtCookie) {
      return jwtCookie.split('=')[1].trim();
    }
    return null;
  }

  async connect() {
    try {
      const jwtToken = this.getJwtToken();
      
      if (!jwtToken) {
        toast.error('Authentication token not found');
        return false;
      }

      const microphoneStarted = await this.startMicrophone();
      if (!microphoneStarted) return false;

      console.log('Attempting to connect to WebSocket...');
      
      // Use the JWT token from cookies
      this.ws = new WebSocket(`wss://smartminds.eoi.group/ws/chat/realtime/?token=${jwtToken}`);
      
      this.ws.onopen = () => {
        console.log('WebSocket connection established successfully');
        toast.success('Voice connection active');
        this.setupAudioRecording();
      };

      this.ws.onmessage = async (event) => {
        try {
          const response = JSON.parse(event.data);
          console.log('Received response:', response);

          if (response.audio) {
            await this.playAudioResponse(response.audio);
          }

          if (response.message === "final") {
            console.log("Stream ended");
            // Handle stream end if needed
          }
        } catch (e) {
          console.error('Error processing message:', e);
        }
      };

      this.ws.onerror = (error) => {
        console.error('Detailed WebSocket error:', {
          error,
          readyState: this.ws?.readyState,
          url: this.ws?.url
        });
        toast.error('Voice connection error. Check console for details.');
      };

      this.ws.onclose = () => {
        if (this.isProcessingAudio) {
          console.log('Connection closed while processing audio');
          this.reconnect();
        } else {
          console.log('Voice WebSocket Disconnected! 🔴');
          toast.info('Voice connection closed');
          this.cleanup();
        }
      };

      return true;
    } catch (error: unknown) {
      console.error('Connection setup error:', error);
      if (error instanceof Error) {
        toast.error(`Connection failed: ${error.message}`);
      } else {
        toast.error('Connection failed: Unknown error');
      }
      this.cleanup();
      return false;
    }
  }

  private async reconnect() {
    console.log('Attempting to reconnect...');
    await this.connect();
  }

  private async playAudioResponse(base64Audio: string) {
    if (!this.audioContext) return;

    try {
      this.isProcessingAudio = true;
      const audioData = atob(base64Audio);
      const arrayBuffer = new ArrayBuffer(audioData.length);
      const view = new Uint8Array(arrayBuffer);
      for (let i = 0; i < audioData.length; i++) {
        view[i] = audioData.charCodeAt(i);
      }

      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      source.start();

      source.onended = () => {
        this.isProcessingAudio = false;
      };
    } catch (error) {
      console.error('Error playing audio response:', error);
      this.isProcessingAudio = false;
    }
  }

  private cleanup() {
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
    }
    this.mediaStream = null;
    this.mediaRecorder = null;
    this.isProcessingAudio = false;
  }

  disconnect() {
    this.cleanup();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}

const WebSocketConnect: React.FC = () => {
  const { id } = useParams();
  const { personas } = usePersona();
  const [isActive, setIsActive] = useState<boolean>(false);
  
  // Get the current persona
  const persona = personas.find(
    (p) => Number(p.persona_id) === Number(id)
  );

  // Initialize WebSocketManager with the correct persona_id
  const [wsManager] = useState<WebSocketManager>(() => {
    const personaId = persona?.persona_id?.toString();
    if (!personaId) {
      console.error('No persona_id found');
      toast.error('Persona not found');
    }
    return new WebSocketManager(personaId || "1");
  });

  const handleVoiceToggle = useCallback(async () => {
    if (!isActive) {
      const connected = await wsManager.connect();
      if (connected) {
        setIsActive(true);
      }
    } else {
      wsManager.disconnect();
      setIsActive(false);
    }
  }, [wsManager, isActive]);

  return (
    <>
      <Button
        variant="link-outlined"
        className={`p-0 h-auto transition-colors duration-200 ${
          isActive ? 'text-green-500 hover:text-green-600' : 'text-red-500 hover:text-red-600'
        }`}
        onClick={handleVoiceToggle}
        title={isActive ? 'Stop Voice Chat' : 'Start Voice Chat'}
      >
        {isActive ? <Mic width={16} /> : <MicOff width={16} />}
      </Button>

      <VoiceChatOverlay
        isActive={isActive}
        profileImage={persona?.profile_image || '/default-avatar.png'}
        onClose={() => {
          wsManager.disconnect();
          setIsActive(false);
        }}
      />
    </>
  );
};

export default WebSocketConnect;