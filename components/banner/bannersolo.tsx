"use client";

import React from "react";
import Image from "next/image";
import { Typography } from "../ui/typography";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";


const Banner = () => {
  // Remove loading logic and directly render the Banner content
  return (

    <div className="relative h-[280px] rounded-3xl overflow-hidden">
      <Image
        src="/9448016.jpg"
        alt="Banner background"
        fill
        priority
        className="object-cover"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered */}
      <div className="relative h-full w-full flex flex-col items-center justify-center p-6 text-center z-10">
  
        <Typography variant="h3" className="text-white typing-effect">
        Every Conversation, A New Connection
        </Typography>

        <Typography className="text-white mt-2">
          Who do you want to talk to?
        </Typography>

      </div>
    </div>
  );
};

export default Banner;