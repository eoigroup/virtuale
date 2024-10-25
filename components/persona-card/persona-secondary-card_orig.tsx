import { IPersona } from "@/types/persona";
import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import PersonaImage from "../persona-image/persona-image";

const PersonaSecondaryCard = ({ persona }: { persona: IPersona }) => {
  return (
    <Link
      href={`/chat/${persona.persona_id}`}
      className="flex gap-4 bg-surface-elevation-1 rounded-lg p-4 hover:bg-scrim-8 transition-all duration-300"
    >
      <PersonaImage
        image={persona.profile_image}
        className="w-[54px] h-[54px] object-cover rounded-full"
        defaultSize={24}
      />
      <div className="flex-1 flex flex-col">
        <Typography variant={"small"} className="mb-2" as={"div"}>
          {persona.name}
        </Typography>
        <div className="flex-1">
          <Typography
            variant={"xsmall"}
            as={"div"}
            className="text-foreground font-normal line-clamp-2 text-ellipsis overflow-hidden whitespace-normal break-anywhere"
          >
            {persona.profile_description}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default PersonaSecondaryCard;
