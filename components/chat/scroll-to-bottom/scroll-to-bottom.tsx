import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React, { memo } from "react";

const ScrollToBottom = ({
  isScrolledUp,
  onClick,
}: {
  isScrolledUp: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn(
        "absolute pointer-events-auto flex justify-end w-fit bottom-28 right-5 p-unit-sm opacity-0 transition-all translate-y-[2rem]",
        { "opacity-100 translate-y-0": isScrolledUp }
      )}
    >
      <Button
        type="button"
        aria-label="Go to most recent message"
        className="rounded-full p-1 h-auto"
        onClick={onClick}
      >
        <ChevronDown />
      </Button>
    </div>
  );
};

export default memo(ScrollToBottom);
