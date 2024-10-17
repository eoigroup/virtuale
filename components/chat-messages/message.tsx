import { ChatSenderTypes, ChatTypes } from "@/lib/chat";
import { ChatMessage } from "@/types/chat";
import { IPersona } from "@/types/persona";
import React, { useRef, useState } from "react";
import PersonaImage from "../persona-image/persona-image";
import UserAvatar from "../user-avatar/user-avatar";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";
import { useUser } from "@/contexts/user-context";
import { Play } from "lucide-react";
import AudioPlayerVisualizer from "../audio-player-visualizer/audio-player-visualizer";
import Image from "next/image";

const Message = ({
  message,
  persona,
}: {
  message: ChatMessage;
  persona: IPersona;
}) => {
  const { sender } = message;
  const isUser = sender === ChatSenderTypes.USER;
  const { user } = useUser();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const showAudio = () => {
    if (isUser) return false;
    if (message.file_link) {
      return [ChatTypes.AUDIO, ChatTypes.VOICE].includes(message.msg_format);
    }
  };

  const showPhoto = () => {
    return [ChatTypes.PHOTO].includes(message.msg_format);
  };

  const showTextMessage = () => {
    if (
      isUser &&
      [ChatTypes.AUDIO, ChatTypes.VOICE, ChatTypes.PHOTO].includes(
        message.msg_format
      )
    ) {
      return false;
    }

    return true;
  };

  const showAudioMessage = () => {
    if (![ChatTypes.AUDIO, ChatTypes.VOICE].includes(message.msg_format))
      return false;

    if (!isUser) {
      return false;
    }

    return Boolean(message.file_link);
  };

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
          className="w-6 h-6"
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
                className="text-blue cursor-pointer"
                onClick={() => {
                  audioRef.current?.play();
                  setIsPlaying(true);
                }}
              >
                {isPlaying ? <AudioPlayerVisualizer /> : <Play size={16} />}
              </span>
              <audio
                ref={audioRef}
                src={message.file_link!}
                controls={false}
                onEnded={() => setIsPlaying(false)}
              />
            </>
          )}
        </div>
        <div
          className={cn(
            "mt-1 max-w-xl rounded-2xl px-3 min-h-12 flex justify-center py-3 bg-surface-elevation-2 min-w-[60px] font-light",
            { "bg-transparent": showAudioMessage() }
          )}
        >
          {showTextMessage() && (
            <p className="break-words whitespace-pre-line">{message.message}</p>
          )}
          {showAudioMessage() && (
            <audio src={message.file_link!} controls className="h-12 -m-3" />
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
                alt=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
