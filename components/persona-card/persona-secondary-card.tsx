import { IPersona } from "@/types/persona";
import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import PersonaImage from "../persona-image/persona-image";

const PersonaSecondaryCard = ({ persona }: { persona: IPersona }) => {
  return (
<Link
  href={`/chat/${persona.persona_id}`}
  className="flex gap-2 bg-surface-elevation-2 backdrop-blur-lg rounded-full py-1 pl-0 pr-4 hover:bg-white/10 transition-all duration-300"
>
  <div className="pl-2">
    <PersonaImage
      image={persona.profile_image}
      className="w-[95px] h-[85px] object-cover rounded-full -ml-2"
      defaultSize={24}
    />
  </div>
  <div className="flex-1 flex flex-col justify-center -ml-1">
    <Typography 
      variant="small" 
      className="text-lg font-semibold mb-1 leading-none"
    >
      {persona.name}
    </Typography>
    <Typography 
      variant="xsmall"
      className="text-gray-400 mb-2 block"
    >
      {persona.category_name}
    </Typography>
    <Typography
      variant="xsmall"
      className="text-gray-400 line-clamp-2 text-ellipsis overflow-hidden whitespace-normal break-anywhere"
    >
      {persona.profile_description}
    </Typography>
  </div>
</Link>
  );
};

export default PersonaSecondaryCard;
