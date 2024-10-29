import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const PersonaImage = ({
  className = "",
  image,
  defaultSize = 16,
}: {
  className?: string;
  image?: string;
  defaultSize?: number;
}) => {
  const [imgSrc, setImgSrc] = useState(image);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setImgSrc(image);
    setImgError(false);
  }, [image]);

  const handleError = () => {
    setImgError(true);
    // Optionally, fetch a new signed URL here if the image fails to load
  };

  if (imgError) {
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
  }

  return (
    <Image
      src={imgSrc || '/default-image.jpg'} // Fallback to a default image
      width={0}
      height={0}
      sizes="100vw"
      alt=""
      className={cn("rounded-full object-cover", className)}
      onError={handleError}
    />
  );
};

export default PersonaImage;
