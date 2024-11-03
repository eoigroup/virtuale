import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const DEFAULT_IMAGE = 'https://media.identica.ai/media/virtuale/virtualeaiagent-defaultblank.jpg';

const PersonaImage = ({
  className = "",
  image,
  defaultSize = 20,
}: {
  className?: string;
  image?: string;
  defaultSize?: number;
}) => {
  const [imgSrc, setImgSrc] = useState(image || DEFAULT_IMAGE);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (image) {
      setImgSrc(image);
      setImgError(false);
    }
  }, [image]);

  const getBaseUrl = (url: string) => {
    // Extract base URL before the query parameters
    return url.split('?')[0];
  };

  const handleError = () => {
    if (imgSrc && imgSrc !== DEFAULT_IMAGE) {
      // If signed URL fails, try the base URL
      const baseUrl = getBaseUrl(imgSrc);
      if (baseUrl !== imgSrc) {
        setImgSrc(baseUrl);
      } else {
        // If base URL also fails, use default image
        setImgSrc(DEFAULT_IMAGE);
      }
    } else {
      setImgError(true);
    }
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
      src={imgSrc}
      width={0}
      height={0}
      sizes="100vw"
      alt=""
      className={cn("rounded-full object-cover", className)}
      onError={handleError}
      unoptimized={true}
      referrerPolicy="no-referrer"
    />
  );
};

export default PersonaImage;
