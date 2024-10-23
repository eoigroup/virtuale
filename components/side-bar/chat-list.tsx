import React from "react";
import { Typography } from "../ui/typography";
import { usePersona } from "@/contexts/persona-context";
import ChatItem from "./chat-item";
import { useParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { IPersona } from "@/types/persona";

const ChatList = () => {
  const { personas, userConvos, loading } = usePersona();
  const { id } = useParams();
  const getPersonas = () => {
    const arr: IPersona[] = [];
    userConvos.forEach((user) => {
      const persona = personas.find(
        (persona) => persona.persona_id === user.persona_id
      );

      if (persona) {
        arr.push(persona);
      }
    });

    return arr;
  };
  const _personas = getPersonas();
  
  const active = (personaId: string | number) => {
    return id == personaId;
  };

  return (
    <div className="px-4 h-full overflow-auto">
      <Typography variant={"small"} className="font-medium">
        Chats
      </Typography>

      <ul className="py-1">
        {loading
          ? [...Array(3)].map((el, index) => (
              <Skeleton
                key={`persona-chat-item-loading-${index}`}
                className="w-full h-11 mt-1 rounded-md"
              />
            ))
          : _personas.map((persona) => (
              <ChatItem
                key={`chat-${persona.persona_id}`}
                persona={persona}
                active={active(persona.persona_id!)}
              />
            ))}
      </ul>
    </div>
  );
};

export default ChatList;
