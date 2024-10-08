import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import React from "react";

const PersonaImage = ({
  className = "",
  image,
  defaultSize = 16,
}: {
  className?: string;
  image?: string;
  defaultSize?: number;
}) => {
  if (image) {
    return (
      <Image
        src={image}
        width={0}
        height={0}
        sizes="100vw"
        alt=""
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-muted",
        className
      )}
    >
      <User size={defaultSize} />
    </div>
  );
};

export default PersonaImage;
