import React from "react";
import { Typography } from "../ui/typography";
import { usePersona } from "@/contexts/persona-context";
import ChatItem from "./chat-item";
import { usePathname } from "next/navigation";

const ChatList = () => {
  const { personas } = usePersona();
  const pathname = usePathname();

  const active = (personaId: string | number) => {
    return pathname.includes(`/chat/${personaId}`);
  };

  return (
    <div className="px-4 h-full overflow-auto">
      <Typography variant={"small"} className="font-medium">
        Chats
      </Typography>

      <ul className="py-1">
        {personas.map((persona) => (
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
