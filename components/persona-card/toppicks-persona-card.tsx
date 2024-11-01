import { IPersona } from "@/types/persona";
import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { AudioLines, Star, ShieldCheck } from "lucide-react";
import PersonaImage from "../persona-image/persona-image";
import AnimatedCard from "../animated-card/animated-card";

interface TopPicksPersonaCardProps {
  persona: IPersona;
  className?: string; // Add className as an optional prop
}

const TopPicksPersonaCard = ({ persona, className }: TopPicksPersonaCardProps) => {
  return (
    <AnimatedCard
      className={`w-full xl:w-[450px] md:h-[280px] h-[280px] rounded-3xl bg-surface-elevation-2 backdrop-blur-lg p-4 overflow-hidden flex flex-col gap-4 ${className}`}
    >
      <Link href={`/chat/${persona.persona_id}`} className="flex gap-4">
        <div className="relative" style={{ margin: '-1rem 0 -1rem -1rem' }}>
          <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-white/5 via-transparent to-transparent z-10" />
          <PersonaImage
            image={persona.profile_image}
            className="w-[200px] h-[280px] object-cover rounded-l-xl rounded-r-sm"
            defaultSize={24}
          />
        </div>

        <div className="flex-1 flex flex-col">
        <Typography 
            variant="xsmall"
            className="text-gray-400 mb-1 block"
          >
            {persona.category_name}
          </Typography>
          
          <Typography 
            variant="small" 
            className="text-lg font-semibold mb-3 leading-none"
          >
            {persona.name}
          </Typography>

       

          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-1">
              <AudioLines size={12} className="text-gray-400" />
              <Typography
                   //temp - must change to stats from backend
                   variant="xsmall" className="text-gray-400">{persona.msg_history_count === 3 ? "22m" : `${persona.msg_history_count}m`} 
                   </Typography>
            </div>
            <div className="flex items-center gap-1">
              <Star size={12} className="text-gray-400" />
              <Typography variant="xsmall" className="text-gray-400">{persona.likes === 0 ? "6k" : `${persona.likes}k`}
              </Typography>
            </div>

            {persona.verified_agent && (
              <div className="flex items-center gap-1 text-green-500">
                <ShieldCheck size={15} /> 
              </div>
            )}
          </div>

          <Typography
            variant="xsmall"
            className="text-gray-400 line-clamp-3 text-ellipsis overflow-hidden whitespace-normal break-anywhere"
          >
            {persona.profile_description}
          </Typography>
        </div>
      </Link>
    </AnimatedCard>
  );
};

export default TopPicksPersonaCard;
