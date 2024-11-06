"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { isPremiumUser } from "@/lib/utils";
import { useUser } from "@/contexts/user-context";
import { useMenu } from "@/contexts/menu-context";
import { Phone } from "lucide-react";
import VoiceChatOverlay from "./voice-chat-overlay";
import { usePersona } from "@/contexts/persona-context";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { SpeechRecognizer } from "./speech-recognizer";
import { generateAIResponse } from "@/lib/api/chat";

const VoiceChat = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const { user } = useUser();
  const { setIsOpenPremiumModal } = useMenu();
  const { id } = useParams();
  const { personas } = usePersona();
  const persona = personas.find((p) => Number(p.persona_id) === Number(id));
  const [interimText, setInterimText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isPersonaSpeaking, setIsPersonaSpeaking] = useState<boolean>(false);

  const onSend = useCallback((text: string) => {
    handleVoiceChat(text);
  }, []);

  // Initialize WebSocketManager with the correct persona_id
  const [speechRecognizer] = useState<SpeechRecognizer>(() => {
    const personaId = persona?.persona_id?.toString();
    if (!personaId) {
      toast.error("Persona not found");
    }
    return new SpeechRecognizer(setInterimText, onSend);
  });

  const handleVoiceToggle = useCallback(async () => {
    if (!isPremiumUser(user!)) {
      setIsOpenPremiumModal(true);
      return;
    }

    if (!isActive) {
      const connected = await speechRecognizer.connect();
      if (connected) {
        setIsActive(true);
      }
    } else {
      speechRecognizer.disconnect();
      setIsActive(false);
    }
  }, [speechRecognizer, isActive]);

  const handleVoiceChat = async (text: string) => {
    if (!text || isProcessing) return;
    setIsProcessing(true);
    try {
      const response = await generateAIResponse(
        { text, format: "text" },
        id as string
      );
      setIsProcessing(false);

      setIsPersonaSpeaking(true);
      for (const chunk of response.audioChunks) {
        await playAudio(chunk);
      }
      setIsPersonaSpeaking(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const playAudio = async (base64Audio: string) => {
    const audioData = atob(base64Audio);
    const arrayBuffer = new ArrayBuffer(audioData.length);
    const view = new Uint8Array(arrayBuffer);
    for (let i = 0; i < audioData.length; i++) {
      view[i] = audioData.charCodeAt(i);
    }

    const audioContext = new (window.AudioContext ||
      // @ts-ignore
      window.webkitAudioContext)();

    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start(0);

    return new Promise((resolve) => {
      source.onended = resolve;
    });
  };

  return (
    <div className="mt-5 mb-1">
      <Button
        onClick={handleVoiceToggle}
        variant={"outline"}
        className="rounded-full w-11 h-11"
        title={isActive ? "Stop Voice Chat" : "Start Voice Chat"}
      >
        <Phone />
      </Button>

      <VoiceChatOverlay
        isActive={isActive}
        isProcessing={isPersonaSpeaking}
        personaName={persona?.name}
        profileImage={persona?.profile_image || "/default-avatar.png"}
        onClose={() => {
          speechRecognizer.disconnect();
          setIsActive(false);
        }}
        interimText={interimText}
      />
    </div>
  );
};

export default VoiceChat;
