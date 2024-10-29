"use client";

import React, { useEffect, useState, useRef } from "react";
import HeroPersonaCard from "../persona-card/hero-persona-card";
import HeroPersonaCard_Mobile from "../persona-card/hero-persona-card_mobile";
import { Typography } from "../ui/typography";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";
import { IPersona } from "@/types/persona";

const list = [
  {
    title: "Learn Something New Today",
    videoLink: "https://media.identica.ai/media/virtuale/train.mp4",
  },
  {
    title: "Where Conversations Come to Life",
    videoLink: "https://media.identica.ai/media/virtuale/scfiland.mp4",
  },
  {
    title: "Your World of Personal Conversations",
    videoLink: "https://media.identica.ai/media/virtuale/girlrock.mp4",
  },
];

const Banner = ({
  personas,
  loading,
}: {
  personas: IPersona[];
  loading: boolean;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoCurrentTimes, setVideoCurrentTimes] = useState<number[]>(Array(list.length).fill(0));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(Array(list.length).fill(null));
  const activeItem = list[activeIndex];
  const itemsPerPage = 2;
  const startIndex = activeIndex * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const _personas = personas
    .filter((p) => p.virtuale_hero)
    .slice(startIndex, endIndex);

  useEffect(() => {
    if (loading) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % list.length;
      setActiveIndex(nextIndex);
    }, 10000);

    return () => clearInterval(interval);
  }, [loading, activeIndex]);

  useEffect(() => {
    if (videoRefs.current[activeIndex]) {
      videoRefs.current[activeIndex].currentTime = videoCurrentTimes[activeIndex]; // Set to stored time
      videoRefs.current[activeIndex].play(); // Ensure the video plays
    }
  }, [activeIndex]);

  const handleVideoTimeUpdate = (index: number) => {
    if (videoRefs.current[index]) {
      const currentTime = videoRefs.current[index].currentTime; // Get current time
      setVideoCurrentTimes((prev) => {
        const newTimes = [...prev];
        newTimes[index] = currentTime; // Store time for the specific video
        return newTimes;
      });
    }
  };

  if (loading) {
    return <Skeleton className="my-6 w-full h-[300px]" />;
  }

  return (
    <motion.div
      key={`hero-${activeIndex}`}
      className="w-full text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center relative md:mb-12">
        {/* Left Persona Card */}
        <div className="hidden xl:block absolute left-2 z-20" style={{ bottom: '-1rem' }}>
          {_personas[0] && (
            <HeroPersonaCard
              persona={_personas[0]}
              index={0}
            />
          )}
        </div>

        {/* Center Video Container */}
        <div className="h-[380px] bg-contain overflow-hidden relative w-[1200px]">
          <video
            ref={(el) => {
              videoRefs.current[activeIndex] = el; // Attach the correct ref
            }}
            preload="auto"
            className="object-cover object-center select-none w-full h-[380px]"
            id="hero-scenario-video"
            autoPlay
            playsInline
            muted
            loop
            onTimeUpdate={() => handleVideoTimeUpdate(activeIndex)} // Track time updates
            key={`hero-video-${activeIndex}`}
          >
            <source src={activeItem.videoLink} type="video/mp4" />
          </video>

          <div
            className="m-h-[380px] h-[380px] absolute md:z-10 top-0 w-full"
            style={{
              backgroundImage: `linear-gradient(to right, 
                var(--background), 
                var(--hero-transparent), 
                var(--background))`,
            }}
          />

          <div className="absolute z-10 p-5 md:p-10 flex flex-col justify-end h-full w-full top-0">
            <div className="w-full text-center">
              <Typography className="text-muted-foreground">
                Who do you want to talk to?
              </Typography>
              <Typography 
                key={`typing-${activeIndex}`} 
                variant={"h3"} className="typing-effect">
                {activeItem.title}
              </Typography>
            </div>
          </div>
        </div>

        {/* Right Persona Card */}
        <div className="hidden xl:block absolute right-2 z-20" style={{ bottom: '-1rem' }}>
          {_personas[1] && (
            <HeroPersonaCard
              persona={_personas[1]}
              index={1}
            />
          )}
        </div>
      </div>

      {/* Mobile Persona Cards */}
      <div className="-mt-3 md:mt-4 flex gap-4 xl:hidden ">
        {_personas.map((persona, index) => (
          <HeroPersonaCard_Mobile
            key={`hero-persona-${persona.persona_id}`}
            persona={persona}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Banner;
