import React from "react";
import AnimatedCard from "../animated-card/animated-card";
import { cn } from "@/lib/utils";
import { IPersona } from "@/types/persona";
import PersonaImage from "../persona-image/persona-image";
import { Typography } from "../ui/typography";
import Link from "next/link";

const HeroPersonaCard = ({
  persona,
  index = 0,
  className,
}: {
  persona: IPersona;
  className?: string;
  index?: number;
}) => {
  return (
    <Link
      href={`/chat/${persona.persona_id}`}
      className={cn(
        "flex-1 hero-card-effect transition-all duration-300",
        className
      )}
    >
      <AnimatedCard
        className={cn(
          "w-full max-w-[280px] min-h-[320px] rounded-3xl bg-white/10 backdrop-blur-lg",
          "p-6 flex flex-col gap-6",
          "hover:shadow-lg hover:scale-105 transition-all duration-300"
        )}
        visibleCircle
        circleSize={350}
        initial={{ opacity: 0, translateY: "50px" }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.2, delay: index * 0.1 }}
      >
        {/* Header Section */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between mb-2">
            <Typography variant="h3" className="text-xl font-semibold">
              {persona.name}
            </Typography>
            <div className="flex items-center gap-1">
              <svg 
                viewBox="0 0 24 24" 
                className="w-4 h-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2L1 21h22L12 2zm0 3.17L19.83 19H4.17L12 5.17z"/>
              </svg>
            </div>
          </div>
          <Typography className="text-sm text-gray-400">
            Great for narrating stories
          </Typography>
        </div>

        {/* Stats Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M3 18v-6a9 9 0 0 1 18 0v6" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
            <span className="text-sm">17.9m</span>
          </div>
          <div className="flex items-center gap-2">
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" 
                stroke="currentColor" 
                strokeWidth="2"
              />
              <circle 
                cx="12" 
                cy="7" 
                r="4" 
                stroke="currentColor" 
                strokeWidth="2"
              />
            </svg>
            <span className="text-sm">4k</span>
          </div>
        </div>

        {/* Persona Image */}
        <div className="flex justify-center">
          <PersonaImage
            image={persona.profile_image}
            className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600"
          />
        </div>

        {/* Save Button */}
        <button className="w-full py-3 px-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors duration-300">
          Save to My Voices
        </button>
      </AnimatedCard>
    </Link>
  );
};

export default HeroPersonaCard;