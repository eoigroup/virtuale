"use client";

import { usePersona } from "@/contexts/persona-context";
import { useParams } from "next/navigation";
import React, { memo } from "react";
import PersonaImage from "../persona-image/persona-image";
import { Typography } from "../ui/typography";
import RightPanelPersonaActions from "./right-panel-persona-actions";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";

const ChatRightPanel = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  const { id } = useParams();
  const { personas } = usePersona();
  const persona = personas.find((p) => String(p.persona_id) === id);
  if (!persona) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "h-screen m-0 p-0 max-h-none rounded-none sm:rounded-none right-0 left-auto w-80 min-w-80 border-none outline-none",
          "translate-x-0 translate-y-0 top-0 data-[state=open]:zoom-in-0 chat-right-panel"
        )}
        aria-describedby=""
      >
        <DialogHeader className="hidden">
          <DialogTitle />
        </DialogHeader>
        <div className="h-full flex-col p-6 gap-3 flex border-l border-l-border-divider">
          <div className="flex items-center gap-3">
            <PersonaImage
              image={persona.profile_image}
              className="w-[65px] h-[65px] object-cover"
            />

            <Typography>{persona.name}</Typography>
          </div>
          <RightPanelPersonaActions persona={persona} />
          {persona.profile_about && (
            <Typography variant={"xsmall"} className="text-muted-foreground">
              {persona.profile_about}
            </Typography>
          )}
          <div
            data-orientation="horizontal"
            role="none"
            className="shrink-0 bg-border-divider h-[1px] w-full"
          ></div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ChatRightPanel);
