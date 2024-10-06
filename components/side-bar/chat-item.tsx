import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Typography } from "../ui/typography";
import { IPersona } from "@/types/persona";

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
        <Image
          src={persona.profile_image}
          width={0}
          height={0}
          sizes="100vw"
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <Typography variant={"small"} className="line-clamp-1">{persona.name}</Typography>
      </Link>
    </li>
  );
};

export default ChatItem;
