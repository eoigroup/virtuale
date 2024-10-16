import PersonaImage from "@/components/persona-image/persona-image";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { usePersona } from "@/contexts/persona-context";
import { Ellipsis } from "lucide-react";
import { useParams } from "next/navigation";
import React, { memo } from "react";

const ChatHeader = ({ onOpenPanel }: { onOpenPanel: () => void }) => {
  const { id } = useParams();
  const { personas } = usePersona();
  const persona = personas.find(
    (persona) => Number(persona.persona_id) === Number(id)
  );

  if (!persona) return null;

  return (
    <div className="relative w-full items-center justify-between p-6 pl-16 md:px-12 min-h-20 flex z-10">
      <div className="flex gap-2">
        <PersonaImage
          image={persona.profile_image}
          className="w-10 h-10 min-w-10"
        />
        <div className="flex flex-col">
          <Typography as={"span"}>{persona.name}</Typography>
          <Typography
            variant={"xsmall"}
            as={"span"}
            className="text-muted-foreground"
          >
            {persona.category_name}
          </Typography>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          onClick={onOpenPanel}
          variant={"outline"}
          className="p-2 h-fit rounded-full"
        >
          <Ellipsis size={16} />
        </Button>
      </div>
    </div>
  );
};

export default memo(ChatHeader);
