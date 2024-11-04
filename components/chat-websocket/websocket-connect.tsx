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
  private recognition: SpeechRecognition | null = null;
  private setInterimText: (text: string) => void;
  private personaId: string;
  private lastSendTime: number = 0;
  private SEND_INTERVAL = 60000; // 60 seconds in milliseconds
  private textBuffer: string = '';

  constructor(personaId: string, setInterimText: (text: string) => void) {
    this.personaId = personaId;
    this.setInterimText = setInterimText;
    this.setupSpeechRecognition();
  }

  private setupSpeechRecognition() {
    const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognitionAPI) {
      try {
        this.recognition = new SpeechRecognitionAPI();
        
        if (this.recognition) {
          this.recognition.continuous = true;
          this.recognition.interimResults = true;
          
          this.recognition.onresult = (event: SpeechRecognitionEvent) => {
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
              const transcript = event.results[i][0].transcript;
              if (event.results[i].isFinal) {
                this.textBuffer += transcript + ' ';
                
                const currentTime = Date.now();
                if (currentTime - this.lastSendTime >= this.SEND_INTERVAL) {
                  this.sendBufferedText();
                }
              } else {
                interimTranscript += transcript;
                this.setInterimText(interimTranscript);
              }
            }

            if (interimTranscript) {
              this.setInterimText(interimTranscript);
            }
          };
        }
      } catch (error) {
        console.error('Speech Recognition setup failed:', error);
        toast.error('Speech recognition not available');
      }
    }
  }

  private sendBufferedText() {
    if (this.textBuffer.trim() && this.ws?.readyState === WebSocket.OPEN) {
      const message = {
        persona_id: this.personaId,
        format: "text",
        text: this.textBuffer.trim(),
        metadata: {}
      };
      
      console.log('Sending buffered text:', message);
      this.ws.send(JSON.stringify(message));
      
      // Reset buffer and update last send time
      this.textBuffer = '';
      this.lastSendTime = Date.now();
    }
  }

  async connect() {
    try {
      // Get JWT token from cookies
      const jwtToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('jwt='))
        ?.split('=')[1];

      if (!jwtToken) {
        console.error('No JWT token found in cookies');
        toast.error('Authentication failed');
        return false;
      }

      // Connect with proper JWT authentication
      this.ws = new WebSocket(`wss://smartminds.eoi.group/ws/chat/realtime/?token=${jwtToken}`);
      
      this.ws.onopen = () => {
        console.log('WebSocket connected');
        if (this.recognition) {
          this.recognition.start();
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast.error('Connection failed');
      };

      // Set up interval to check and send buffered text
      setInterval(() => {
        if (this.textBuffer.trim()) {
          this.sendBufferedText();
        }
      }, this.SEND_INTERVAL);

      return true;
    } catch (error) {
      console.error('Connection error:', error);
      return false;
    }
  }

  disconnect() {
    if (this.textBuffer.trim()) {
      this.sendBufferedText();
    }
    
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
    
    if (this.ws) {
      try {
        this.ws.close();
      } catch (error) {
        console.error('Error closing websocket:', error);
      }
    }
    
    this.setInterimText('');
  }
}

const WebSocketConnect: React.FC = () => {
  const { id } = useParams();
  const { personas } = usePersona();
  const [isActive, setIsActive] = useState<boolean>(false);
  const [interimText, setInterimText] = useState<string>('');
  
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
    return new WebSocketManager(personaId || "1", setInterimText);
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
        interimText={interimText}
      />
    </>
  );
};

export default WebSocketConnect;