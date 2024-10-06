import { IPersona } from "@/types/persona";
import Image from "next/image";
import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const PersonaCard = ({ persona }: { persona: IPersona }) => {
  return (
    <Link
      href={`/chat/${persona.persona_id}`}
      className="flex gap-4 rounded-lg bg-surface-elevation-1 p-4 cursor-pointer transition-all hover:bg-scrim-8"
    >
      <Image
        src={persona.profile_image}
        width={0}
        height={0}
        sizes="100vw"
        alt={persona.name}
        className="w-[90px] h-[115px] object-cover rounded-xl"
      />
      <div className="flex-1 flex flex-col">
        <Typography variant={"small"} className="mb-2" as={"div"}>
          {persona.name}
        </Typography>
        <Typography
          variant={"xsmall"}
          className="flex-1 text-foreground font-normal line-clamp-3 text-ellipsis overflow-hidden whitespace-normal break-anywhere"
        >
          {persona.profile_description}
        </Typography>
        <div className="flex gap-1 items-center text-muted-foreground">
          <MessageCircle size={12} />
          <Typography variant={"xsmall"}>
            {persona.msg_history_count}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default PersonaCard;
