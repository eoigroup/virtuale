import PersonaImage from "@/components/persona-image/persona-image";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { IPersona } from "@/types/persona";
import React from "react";

const PersonaDetailCenter = ({ persona }: { persona: IPersona }) => {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col items-center text-center gap-1 pb-6 pt-12",
        "overflow-auto",
        "gap-1"
      )}
    >
      <PersonaImage
        image={persona.profile_image}
        className="w-16 h-16 object-cover rounded-full"
        defaultSize={24}
      />
      <Typography variant={"h6"}>{persona.name}</Typography>
    </div>
  );
};

export default PersonaDetailCenter;
