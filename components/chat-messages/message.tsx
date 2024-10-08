import { ChatSenderTypes } from "@/lib/chat";
import { ChatMessage } from "@/types/chat";
import { IPersona } from "@/types/persona";
import React from "react";
import PersonaImage from "../persona-image/persona-image";
import UserAvatar from "../user-avatar/user-avatar";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";
import { useUser } from "@/contexts/user-context";

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
        <Typography variant={"xsmall"} as={"div"} className="font-light">
          {isUser ? user?.username : persona.name}
        </Typography>
        <div className="mt-1 max-w-xl rounded-2xl px-3 min-h-12 flex justify-center py-3 bg-surface-elevation-2 min-w-[60px] font-light">
          <p className="break-words whitespace-pre-line">{message.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
