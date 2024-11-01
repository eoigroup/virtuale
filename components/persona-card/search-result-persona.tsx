import { IPersona } from "@/types/persona";
import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import PersonaImage from "../persona-image/persona-image";

const SearchResultPersonaCard = ({ persona }: { persona: IPersona }) => {
  return (
    <Link
      href={`/chat/${persona.persona_id}`}
      className="flex gap-4 rounded-2xl p-4 hover:bg-scrim-8 transition-all duration-300"
    >
      <PersonaImage
        image={persona.profile_image}
        className="w-[52px] h-[52px] md:w-[60px] md:h-[60px] object-cover rounded-full bg-scrim-8"
        defaultSize={24}
      />
      <div className="flex-1 flex flex-col">
        <Typography className="mb-2 text-sm md:text-base" as={"div"}>
          {persona.name}
        </Typography>
        <div className="flex-1">
          <Typography
            variant={"xsmall"}
            as={"div"}
            className="text-foreground font-normal line-clamp-1 text-ellipsis overflow-hidden whitespace-normal break-anywhere"
          >
            {persona.profile_about}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultPersonaCard;
