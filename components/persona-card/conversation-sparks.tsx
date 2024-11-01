"use client";

import { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { Typography } from "../ui/typography";
import PromptSuggestionCard from "../persona-card/prompt-suggestion-card";
import { IPersona } from "@/types/persona";

const ConversationSparks = ({ personas }: { personas: IPersona[] }) => {
  const [shuffledSuggestions, setShuffledSuggestions] = useState<IPersona[]>([]);

  const promptSuggestionPersonas = useMemo(() => 
    personas.filter((p) => {
      if (!p.agent_suggested_questions) return false;
      const suggestions = p.agent_suggested_questions.split("@");
      return suggestions.length >= 3;
    }),
    [personas]
  );

  useEffect(() => {
    const shuffleItems = () => {
      if (promptSuggestionPersonas.length === 0) return;

      setShuffledSuggestions(prevItems => {
        const newShuffle = [...promptSuggestionPersonas]
          .sort(() => Math.random() - 0.5)
          .slice(0, 8);
        
        if (!prevItems.length) return newShuffle;

        const isDifferentEnough = newShuffle.some((item, index) => 
          prevItems[index]?.persona_id !== item.persona_id
        );
        
        return isDifferentEnough ? newShuffle : prevItems;
      });
    };

    shuffleItems();
    const intervalId = setInterval(shuffleItems, 180000);
    return () => clearInterval(intervalId);
  }, [promptSuggestionPersonas]);

  return (
    <div className="mt-10">
      <Typography variant={"h5"} className="mb-4 ml-4">
        Conversation Sparks
      </Typography>
      <Swiper
        spaceBetween={10}
        modules={[FreeMode, Navigation]}
        freeMode
        navigation
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="self-swiper"
      >
        {shuffledSuggestions.map((persona) => (
          <SwiperSlide key={`feature-${persona.persona_id}`}>
            <PromptSuggestionCard persona={persona} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ConversationSparks;