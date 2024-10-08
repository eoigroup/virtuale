"use client";

import ChatInput from "@/components/chat-input/chat-input";
import ChatMessages from "@/components/chat-messages/chat-messages";
import ChatRightPanel from "@/components/chat-right-panel/chat-right-panel";
import ChatPageLoading from "@/components/loading/chat-page-loading/chat-page-loading";
import PersonaImage from "@/components/persona-image/persona-image";
import { Typography } from "@/components/ui/typography";
import { usePersona } from "@/contexts/persona-context";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import React from "react";

const ChatPage = () => {
  const { id } = useParams();
  const { personas, loading } = usePersona();
  const persona = personas.find(
    (persona) => Number(persona.persona_id) === Number(id)
  );

  if (loading) {
    return <ChatPageLoading />;
  }

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
            <PersonaImage
              image={persona.profile_image}
              className="w-16 h-16 object-cover rounded-full"
              defaultSize={24}
            />
            <Typography variant={"h6"}>{persona.name}</Typography>
          </div>

          <ChatMessages personaId={persona.persona_id} />
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
