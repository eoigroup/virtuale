import { IPersona } from "@/types/persona";
import React from "react";
import { Typography } from "../ui/typography";
import PersonaImage from "../persona-image/persona-image";
import Link from "next/link";

const PromptSuggestionCard = ({ persona }: { persona: IPersona }) => {
  const suggestions = persona.agent_suggested_questions?.split("@") || [];

  return (
    <div className="flex flex-col gap-2 bg-surface-elevation-1 rounded-lg p-4">
      <div className="flex gap-4">
        <PersonaImage
          image={persona.profile_image}
          className="w-[48px] h-[48px] object-cover rounded-full"
          defaultSize={24}
        />
        <div className="flex-1 flex flex-col">
          <Typography variant={"small"} className="mb-2" as={"div"}>
            {persona.name}
          </Typography>
          <div className="flex flex-1">
            <Typography
              variant={"xsmall"}
              as={"div"}
              className="text-foreground font-normal line-clamp-2 text-ellipsis overflow-hidden whitespace-normal break-anywhere"
            >
              {`${persona.msg_history_count} chats`}
            </Typography>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-1">
        {suggestions.slice(0, 2).map((suggestion, index) => (
          <Link
            href={`/chat/${persona.persona_id}?suggestion=${index}`}
            key={`suggestion-${persona.persona_id}-${index}`}
            className="w-full rounded-md p-3 bg-surface-elevation-2 hover:bg-scrim-8"
          >
            <Typography variant={"xsmall"} as={"div"}>
              {suggestion}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PromptSuggestionCard;
