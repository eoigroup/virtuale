import { useUser } from "@/contexts/user-context";
import Image from "next/image";
import React from "react";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";
import { Pen } from "lucide-react";

const UserAvatar = ({
  className = "",
  variant = "xsmall",
  editable,
}: {
  editable?: boolean;
  className?: string;
  variant?: "xsmall" | "small" | "large";
}) => {
  const { user } = useUser();

  const getAvatarName = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }

    return user?.email.charAt(0).toUpperCase();
  };

  return (
    <picture
      className={cn(
        "flex items-center justify-center min-w-9 w-9 h-9 rounded-full font-bold character-gradient-v",
        "relative",
        className
      )}
    >
      {user?.profile_picture ? (
        <Image
          src={user.profile_picture}
          width={0}
          height={0}
          alt=""
          className="w-full h-full"
          sizes="100vw"
        />
      ) : (
        <Typography variant={variant}>{getAvatarName()}</Typography>
      )}

      {editable && (
        <div className="absolute -bottom-1 right-0 rounded-full bg-surface-elevation-2 p-2 cursor-pointer">
          <Pen size={12} />
        </div>
      )}
    </picture>
  );
};

export default UserAvatar;
