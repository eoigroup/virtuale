import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Typography } from "../ui/typography";

const ChatItem = ({ active }: { active: boolean }) => {
  return (
    <li className="mt-1">
      <Link
        href={"/chat/123"}
        className={cn(
          "w-full flex items-center gap-2 px-2 py-1 rounded-md",
          "transform duration-200 hover:bg-primary/90",
          { "bg-primary": active }
        )}
      >
        <Image
          src="https://characterai.io/i/80/static/avatars/uploaded/2022/11/15/lKDJOnMMJs9USCMETWPPGYv5z4czHuVUGHC5apXDUHA.webp?webp=true&anim=0"
          width={0}
          height={0}
          sizes="100vw"
          alt=""
          className="w-8 h-8 rounded-full object-cover"
        />
        <Typography variant={"small"}>Sukuna</Typography>
      </Link>
    </li>
  );
};

export default ChatItem;
