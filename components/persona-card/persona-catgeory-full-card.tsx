import { IPersona } from "@/types/persona";
import React from "react";
import { Typography } from "../ui/typography";
import PersonaImage from "../persona-image/persona-image";
import Link from "next/link";
import AnimatedCard from "../animated-card/animated-card";
import { MessageCircle } from "lucide-react";

const PromptSuggestionCard = ({ persona }: { persona: IPersona }) => {
  const suggestions = persona.agent_suggested_questions?.split("@") || [];

  return (
    <AnimatedCard className="rounded-3xl bg-surface-elevation-2 backdrop-blur-lg p-4 relative">
      <div className="flex gap-4">
        {/* Left Image Section */}
        <div className="relative" style={{ margin: '-1rem 0 -1rem -1rem' }}>
          <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-white/5 via-transparent to-transparent z-10" />
          <PersonaImage
            image={persona.profile_image}
            className="w-[150px] h-full object-cover rounded-l-xl rounded-r-sm"
            defaultSize={24}
          />
        </div>

        {/* Right Content Section */}
        <div className="flex-1 flex flex-col">
         
        <Typography 
            variant="xsmall"
            className="text-gray-400 mb-1 block"
          >
             {persona.category_name}
          </Typography>

          <Typography 
            variant="small" 
            className="text-lg font-semibold mb-4 leading-none"
          >
            {persona.name}
          </Typography>

          <Typography 
            variant="small" 
            className="text-gray-400 mb-4 line-clamp-4 min-h-[4rem] leading-none"
          >
             {persona.profile_about}
          </Typography>

          
          <Typography 
            variant="small" 
            className=" mb-4 line-clamp-6 min-h-[5rem] leading-none"
          >
            {persona.welcome_message}
          </Typography>

          <Typography 
            variant="small" 
            className="text-gray-400 mb-4 leading-none"
          >
            What would you like to ask me?
          </Typography>
       

      

          {/* Suggestions Section */}
          <div className="flex flex-col gap-2 mt-auto">
            {suggestions.slice(0, 3).map((suggestion, index) => (
              <Link
                href={`/chat/${persona.persona_id}?suggestion=${index}`}
                key={`suggestion-${persona.persona_id}-${index}`}
                className="w-full rounded-md p-2 bg-surface-elevation-1 hover:bg-scrim-8 transition-colors"
              >
                <Typography 
                  variant="xsmall" 
                  className="text-gray-400 line-clamp-1"
                >
                  {suggestion}
                </Typography>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default PromptSuggestionCard;