import React from "react";
import { Button } from "../ui/button";
import { Flag, Share, ThumbsDown, ThumbsUp } from "lucide-react";
import { Typography } from "../ui/typography";
import { IPersona } from "@/types/persona";

const RightPanelPersonaActions = ({ persona }: { persona: IPersona }) => {
  const handleClickLike = () => {
    // TODO: after API ready
  };
  const handleClickDislike = () => {
    // TODO: after API ready
  };

  return (
    <div className="flex justify-between">
      <div className="flex flex-row gap-1">
        <Button variant={"outline"} className="rounded-full h-auto p-3">
          <Share size={16} />
        </Button>

        <div className="rounded-3xl border flex items-center border-border-outline h-auto p-3 gap-2">
          <Button
            variant={"link-outlined"}
            className="p-0 h-auto"
            onClick={handleClickLike}
          >
            <ThumbsUp size={16} />
          </Button>
          <Typography variant={"xsmall"}>{persona.likes}</Typography>
          <span className="h-full w-[1px] bg-current" />

          <Button
            variant={"link-outlined"}
            className="p-0 h-auto"
            onClick={handleClickDislike}
          >
            <ThumbsDown size={16} />
          </Button>
        </div>
      </div>

      <Button variant={"outline"} className="rounded-full h-auto p-3">
        <Flag size={16} />
      </Button>
    </div>
  );
};

export default RightPanelPersonaActions;
