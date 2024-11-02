"use client";

import React, { useEffect, useState, useRef } from "react";
import HeroPersonaCard from "../persona-card/hero-persona-card";
import HeroPersonaCard_Mobile from "../persona-card/hero-persona-card_mobile";
import { Typography } from "../ui/typography";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";
import { IPersona } from "@/types/persona";

const videoLinks = [
  "https://media.identica.ai/media/virtuale/train.mp4",
  "https://media.identica.ai/media/virtuale/scfiland.mp4",
  "https://media.identica.ai/media/virtuale/girlrock.mp4",
  "https://media.identica.ai/media/virtuale/alita_rise.mp4",
];

const titles = [
  "Learn Something New Today",
  "Where Conversations Come to Life",
  "Your World of Personal Conversations",
  "Where Every Chat Has Character",
  "Engage with the Future",
  "Discover New Horizons",
  "Converse with AI",
  "The Next Level of Interaction",
  "Unlock the Power of Dialogue",
  "Explore Endless Possibilities",
  "Beyond Chat, Beyond AI - It's Personal",
  "Find Your Perfect Conversation",
  "Personas for Every Purpose",
  "Chat with Purpose, Connect with Personality",
  "Your Perfect Chat Partner Awaits",
  "Discover Your Next Great Conversation",
  "Your Trusted Circle of Support",
  "Available Where Understanding Meets You",
];


// Function to get random titles
const getRandomTitles = (count: number): string[] => {
  const shuffledTitles = [...titles].sort(() => 0.5 - Math.random());
  return shuffledTitles.slice(0, count);
};

const Banner = ({
  personas,
  loading,
}: {
  personas: IPersona[];
  loading: boolean;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoCurrentTimes, setVideoCurrentTimes] = useState<number[]>(Array(videoLinks.length).fill(0));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>(Array(videoLinks.length).fill(null));
  const [selectedPersonas, setSelectedPersonas] = useState<IPersona[]>([]);
  const [randomTitles, setRandomTitles] = useState(getRandomTitles(3)); // Select random titles

  useEffect(() => {
    if (loading) return;

    const selectRandomPersonas = () => {
      const filteredPersonas = personas.filter((p) => p.virtuale_hero);
      if (filteredPersonas.length < 2) {
        setSelectedPersonas(filteredPersonas);
      } else {
        const randomIndices = new Set<number>();
        while (randomIndices.size < 2) {
          randomIndices.add(Math.floor(Math.random() * filteredPersonas.length));
        }
        const selectedIndices = Array.from(randomIndices);
        setSelectedPersonas(selectedIndices.map(index => filteredPersonas[index]));
      }
    };

    selectRandomPersonas();

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % videoLinks.length;
      setActiveIndex(nextIndex);
      setRandomTitles(getRandomTitles(3)); // Update random titles on index change
      selectRandomPersonas(); // Select new random personas on index change
    }, 10000);

    return () => clearInterval(interval);
  }, [loading, activeIndex, personas]);

  useEffect(() => {
    if (videoRefs.current[activeIndex]) {
      videoRefs.current[activeIndex].currentTime = videoCurrentTimes[activeIndex];
      videoRefs.current[activeIndex].play();
    }
  }, [activeIndex]);

  const handleVideoTimeUpdate = (index: number) => {
    if (videoRefs.current[index]) {
      const currentTime = videoRefs.current[index].currentTime;
      setVideoCurrentTimes((prev) => {
        const newTimes = [...prev];
        newTimes[index] = currentTime;
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
          {selectedPersonas[0] && (
            <HeroPersonaCard
              persona={selectedPersonas[0]}
              index={0}
            />
          )}
        </div>

        {/* Center Video Container */}
        <div className="h-[380px] bg-contain overflow-hidden relative w-[1200px]">
          <video
            ref={(el) => {
              videoRefs.current[activeIndex] = el;
            }}
            preload="auto"
            className="object-cover object-center select-none w-full h-[380px]"
            id="hero-scenario-video"
            autoPlay
            playsInline
            muted
            loop
            onTimeUpdate={() => handleVideoTimeUpdate(activeIndex)}
            key={`hero-video-${activeIndex}`}
          >
            <source src={videoLinks[activeIndex]} type="video/mp4" />
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
                variant={"h3"} className="typing-effect px-4 md:px-0">
                {randomTitles[activeIndex % randomTitles.length]} {/* Display random title */}
              </Typography> 
            </div>
          </div>
        </div>

        {/* Right Persona Card */}
        <div className="hidden xl:block absolute right-2 z-20" style={{ bottom: '-1rem' }}>
          {selectedPersonas[1] && (
            <HeroPersonaCard
              persona={selectedPersonas[1]}
              index={1}
            />
          )}
        </div>
      </div>

      {/* Mobile Persona Cards */}
      <div className="-mt-3 md:mt-4 flex gap-4 xl:hidden ">
        {selectedPersonas.map((persona, index) => (
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
 