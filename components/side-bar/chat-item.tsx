import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Typography } from "../ui/typography";
import { IPersona } from "@/types/persona";
import { User } from "lucide-react";
import PersonaImage from "../persona-image/persona-image";

const ChatItem = ({
  persona,
  active,
}: {
  persona: IPersona;
  active: boolean;
}) => {
  return (
    <li className="mt-1">
      <Link
        href={`/chat/${persona.persona_id}`}
        className={cn(
          "w-full flex items-center gap-2 px-2 py-1.5 rounded-md",
          "transform duration-200 hover:bg-surface-elevation-2",
          { "bg-surface-elevation-2 hover:opacity-80": active }
        )}
      >
        <PersonaImage
          image={persona.profile_image}
          className="w-8 h-8 rounded-full object-cover"
          defaultSize={16}
        />
        <Typography variant={"small"} className="line-clamp-1">
          {persona.name}
        </Typography>
      </Link>
    </li>
  );
};

export default ChatItem;
