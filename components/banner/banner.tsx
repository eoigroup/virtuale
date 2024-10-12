"use client";

import React, { useEffect, useState } from "react";
import HeroPersonaCard from "../persona-card/hero-persona-card";
import { Typography } from "../ui/typography";
import { usePersona } from "@/contexts/persona-context";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// TODO: change video
const list = [
  {
    title: "A trusted circle of support",
    videoLink:
      "https://media.identica.ai/media/virtuale/lighthouse.mp4",
    personas: [13, 87],
  },
  {
    title: "Learn something new today",
    videoLink: "https://media.identica.ai/media/virtuale/library.mp4",
    personas: [5, 87],
  },
];

const Banner = () => {
  const { personas, loading } = usePersona();

  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = list[activeIndex];
  const _personas = personas.filter((p) =>
    activeItem.personas.includes(Number(p.persona_id))
  );

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % list.length;
      setActiveIndex(nextIndex);
    }, 10000);

    return () => clearInterval(interval);
  }, [loading, activeIndex]);

  if (loading) {
    return <Skeleton className="my-6 w-full h-[300px]" />;
  }

  return (
    <motion.div
      key={`hero-${activeIndex}`}
      className={cn(
        "rounded-3xl gap-10 bg-background items-center justify-between hidden xl:flex my-6 relative pb-6"
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-[300px] bg-contain overflow-hidden rounded-3xl rounded-r-none absolute w-full z-0">
        <video
          preload="auto"
          className="object-cover object-center select-none w-[800px] h-[300px]"
          id="hero-scenario-video"
          autoPlay
          key={`hero-video-${activeIndex}`}
        >
          <source src={activeItem.videoLink} type="video/mp4" />
        </video>

        <div
          className="m-h-[300px] h-[300px] absolute z-10 top-0 w-[800px] "
          style={{
            backgroundImage: `linear-gradient(to left, var(--background), var(--hero-transparent))`,
          }}
        />

        <div className="absolute z-10 p-10 justify-between h-full items-start flex flex-col top-0">
          <div>
            <Typography className="text-muted-foreground">
              Who do you want to talk to?
            </Typography>
            <Typography variant={"h3"} className="typing-effect">
              {activeItem.title}
            </Typography>
          </div>
        </div>
      </div>

      <div className="ml-auto flex gap-4">
        {_personas.map((persona, index) => (
          <HeroPersonaCard
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
