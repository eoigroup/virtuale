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
          "w-full xl:w-[280px] md:h-[280px] h-[200px] rounded-xl",
          "p-4"
        )}
        visibleCircle
        circleSize={350}
        initial={{ opacity: 0, translateY: "50px" }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 0.2, delay: index * 0.1 }}
      >
        <div className="flex gap-1">
          <PersonaImage
            image={persona.profile_image}
            className="w-12 min-w-12 h-12"
          />
          <Typography>{persona.name}</Typography>
        </div>
        <Typography className="line-clamp-4">
          {persona.welcome_message}
        </Typography>
      </AnimatedCard>
    </Link>
  );
};

export default HeroPersonaCard;
