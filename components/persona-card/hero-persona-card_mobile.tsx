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
        className,
        "w-full sm:w-1/2" // Set to 50% width on small screens
      )}
    >
      <AnimatedCard
        className={cn(
          "w-full xl:w-[280px] md:h-[280px] h-[250px] rounded-3xl bg-surface-elevation-2 backdrop-blur-lg p-2 py-4",
          "overflow-hidden flex flex-col gap-4"
        )}
        visibleCircle
        circleSize={350}
        initial={{ opacity: 0, translateY: "50px" }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.2, delay: index * 0.1 }}
      >
        {/* Top row with image and title */}
        <div className="flex gap-2 items-center">
          <PersonaImage
            image={persona.profile_image}
            className="w-[55px] h-[55px] object-cover"
          />
          <div className="flex-1 flex flex-col items-center justify-center">
            <Typography 
              variant="small" 
              className="text-lg font-semibold leading-none"
            >
              {persona.name}
            </Typography>
            <Typography 
              variant="xsmall"
              className="text-gray-400 mt-1 block"
            >
               {persona.category_name}
            </Typography>
          </div>
        </div>

        {/* Message below */}
        <Typography 
          className="line-clamp-3 pt-5 text-left"
        >
          {persona.welcome_message}
        </Typography>
      </AnimatedCard>
    </Link>
  );
};

export default HeroPersonaCard;
