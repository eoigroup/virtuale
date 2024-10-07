"use client";

import ChatInput from "@/components/chat-input/chat-input";
import ChatRightPanel from "@/components/chat-right-panel/chat-right-panel";
import { Typography } from "@/components/ui/typography";
import { usePersona } from "@/contexts/persona-context";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const ChatPage = () => {
  const { id } = useParams();
  const { personas } = usePersona();
  const persona = personas.find(
    (persona) => Number(persona.persona_id) === Number(id)
  );

  if (!persona) return null;

  return (
    <div className="flex h-full">
      <div className="w-full flex flex-col items-center">
        <div className="flex-1 w-full overflow-y-auto">
          <div
            className={cn(
              "flex flex-1 flex-col items-center text-center gap-1 pb-6 pt-12",
              "overflow-auto",
              "gap-1"
            )}
          >
            <Image
              src={persona.profile_image}
              width={0}
              height={0}
              alt=""
              sizes="100vw"
              className="w-16 h-16 object-cover rounded-full"
            />
            <Typography variant={"h6"}>{persona.name}</Typography>
          </div>
        </div>

        <div className="flex w-full flex-col max-w-2xl">
          <ChatInput placeholder={`Message ${persona.name}`} />
        </div>
      </div>
      <ChatRightPanel />
    </div>
  );
};

export default ChatPage;
