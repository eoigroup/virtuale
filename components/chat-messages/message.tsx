import { ChatSenderTypes, ChatTypes } from "@/lib/chat";
import { ChatMessage } from "@/types/chat";
import { IPersona } from "@/types/persona";
import React, { useRef, useState, useEffect, Ref, MutableRefObject } from "react";
import PersonaImage from "../persona-image/persona-image";
import UserAvatar from "../user-avatar/user-avatar";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";
import { useUser } from "@/contexts/user-context";
import { Play } from "lucide-react";
import AudioPlayerVisualizer from "../audio-player-visualizer/audio-player-visualizer";
import Image from "next/image";

const TYPING_INTERVAL = 10; // Typing speed in ms per character

const Message = ({
  message,
  persona,
  isAnimating, // New prop to determine if this is the latest message
  scrollContainerRef,
}: {
  message: ChatMessage;
  persona: IPersona;
  isAnimating: boolean;
  scrollContainerRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const { sender } = message;
  const isUser = sender === ChatSenderTypes.USER;
  const { user } = useUser();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>(""); // State to hold displayed text for animation

  const showAudio = () => {
    if (message.file_link) {
      return [ChatTypes.AUDIO, ChatTypes.VOICE].includes(message.msg_format);
    }
  };

  const showPhoto = () => {
    return [ChatTypes.PHOTO].includes(message.msg_format);
  };

  const showTextMessage = () => {
    if (isUser && [ChatTypes.PHOTO].includes(message.msg_format)) {
      return false;
    }
    return [ChatTypes.TEXT, ChatTypes.AUDIO, ChatTypes.VOICE].includes(
      message.msg_format
    );
  };

  const handleAudioPlayToggle = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
      return;
    }
    audioRef.current?.play();
    setIsPlaying(true);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const scrollToBottom = () => {
    if (scrollContainerRef?.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  };

  // Typing animation for AI response, only if it's the latest message
  useEffect(() => {
    if (isAnimating && !isUser && showTextMessage()) {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayedText((prev) => prev + message.message[index]);
        index++;
        scrollToBottom();
        if (index === message.message.length) clearInterval(interval);
      }, TYPING_INTERVAL);
      return () => clearInterval(interval);
    } else {
      setDisplayedText(message.message); // Set full text immediately for other messages
    }
  }, [message.message, isUser, isAnimating]);

  return (
    <div
      className={cn(
        "p-2 m-0 flex flex-row items-start gap-2 justify-start ml-0 md:ml-6",
        { "flex-row-reverse": isUser }
      )}
    >
      {!isUser ? (
        <PersonaImage
          defaultSize={12}
          image={persona.profile_image}
          className="min-w-6 w-6 h-6"
        />
      ) : (
        <UserAvatar className="min-w-6 w-6 h-6" />
      )}
      <div className={cn("flex flex-col gap-1", { "items-end": isUser })}>
        <div className="w-fit flex items-center gap-2">
          <Typography
            variant={"xsmall"}
            as={"div"}
            className="font-light w-fit"
          >
            {isUser ? user?.username : persona.name}
          </Typography>

          {showAudio() && (
            <>
              <span
                className="text-blue cursor-pointer w-4 min-w-4"
                onClick={handleAudioPlayToggle}
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <AudioPlayerVisualizer /> : <Play size={16} />}
              </span>
              <audio
                ref={audioRef}
                src={message.file_link!}
                controls={false}
                onEnded={handleAudioEnded}
              />
            </>
          )}
        </div>
        <div
          className={cn(
            "mt-1 max-w-xl rounded-2xl px-3 min-h-12 flex justify-center py-3 bg-surface-elevation-2 min-w-[60px] font-light"
          )}
        >
          {showTextMessage() && (
            <p className="break-words whitespace-pre-line">
              {isUser ? message.message : displayedText}
            </p>
          )}

          {showPhoto() && (
            <div className="-m-3">
              <Image
                width={0}
                src={message.message}
                height={0}
                sizes="100vw"
                priority
                className="rounded-md w-auto h-auto"
                alt="Image"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
