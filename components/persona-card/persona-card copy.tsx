import { IPersona } from "@/types/persona";
import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import PersonaImage from "../persona-image/persona-image";
import AnimatedCard from "../animated-card/animated-card";

const PersonaCard = ({ persona }: { persona: IPersona }) => {
  return (
    <AnimatedCard className="rounded-lg p-4">
      <Link
        href={`/chat/${persona.persona_id}`}
        className="flex gap-4 flex-row-reverse"
      >
        <PersonaImage
          image={persona.profile_image}
          className="w-[90px] h-[115px] object-cover rounded-xl"
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
              className="text-foreground font-normal line-clamp-3 text-ellipsis overflow-hidden whitespace-normal break-anywhere"
            >
              {persona.profile_description}
            </Typography>
          </div>
          <div className="flex gap-1 items-center text-muted-foreground">
            <MessageCircle size={12} />
            <Typography variant={"xsmall"}>
              {persona.msg_history_count}
            </Typography>
          </div>
        </div>
      </Link>
    </AnimatedCard>
  );
};

export default PersonaCard;