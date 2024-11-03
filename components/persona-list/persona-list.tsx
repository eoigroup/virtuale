"use client";

import { useState, useEffect, useMemo } from 'react';
import PersonaCard from "../persona-card/persona-card";
import StaticCard from "../static-card/static-card";
import PersonaLoading from "./persona-loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { Typography } from "../ui/typography";
import PersonaSecondaryCard from "../persona-card/persona-secondary-card";
import ConversationSparks from "../persona-card/conversation-sparks";
import PersonaTile from "../persona-card/persona-tile";

import { IPersona, IUserConvos } from "@/types/persona";
import CategoryList from "./category-list";
import FeaturedPersonas from "./featured-personas";
import Footer from "@/components/footer/page";

const PersonaList = ({
  personas,
  loading = false,
  userConvos = [],
}: {
  personas: IPersona[];
  loading?: boolean;
  userConvos?: IUserConvos[];
}) => {
  // JL-All hooks called at the top level, before any conditional logic
  const [shuffledTryThese, setShuffledTryThese] = useState<IPersona[]>([]);

  // JL-combined useMemo hooks together
  const forYouPersonas = useMemo(() => 
    personas.filter((p) => userConvos.some((u) => u.persona_id === p.persona_id)),
    [personas, userConvos]
  );

  const featuredPersonas = useMemo(() => 
    personas.filter((p) => p.virtuale_featured),
    [personas]
  );

  const promptSuggestionPersonas = useMemo(() => 
    personas.filter((p) => {
      if (!p.agent_suggested_questions) return false;
      const suggestions = p.agent_suggested_questions.split("@");
      return suggestions.length >= 2;
    }),
    [personas]
  );

  const tryThese = useMemo(() => 
    personas.filter((p) => p.virtuale_trythese),
    [personas]
  );

  // Memoize the try these section
  const tryTheseSection = useMemo(() => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
      {shuffledTryThese.map((persona, index) => (
        <div 
          key={`try-${persona.persona_id}`} 
          className={`${index >= 4 ? 'hidden sm:block' : ''}`}
        >
          <PersonaSecondaryCard persona={persona} />
        </div>
      ))}
    </div>
  ), [shuffledTryThese]);

  useEffect(() => {
    const shuffleItems = () => {
      if (tryThese.length === 0) return;

      setShuffledTryThese(prevItems => {
        const newShuffle = [...tryThese]
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
  }, [tryThese]);

  if (loading) {
    return <PersonaLoading />;
  }

  return (
    <>
      {forYouPersonas.length > 0 && (
        <div className="mt-10">
          <Typography variant={"h5"} className="mb-4 ml-4">
            Your Inner Circle
          </Typography>
          <Swiper
            spaceBetween={10}
            modules={[FreeMode, Navigation]}
            freeMode
            navigation
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="self-swiper"
          >
            {forYouPersonas.map((persona) => (
              <SwiperSlide key={persona.persona_id}>
                <PersonaCard persona={persona} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}





      <div className="mt-10">
        <Typography variant={"h5"} className="mb-4 ml-4">
          Spotlight Conversations
        </Typography>
        {tryTheseSection}
      </div>

      <FeaturedPersonas personas={personas} featuredPersonas={featuredPersonas} />

      <CategoryList personas={personas} />

      <ConversationSparks personas={personas} />
 
      <PersonaTile
        topLabel="LEARN MORE"
        backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-thebrainstormer.jpeg"
        backColour="#E19417"
        buttonColour="#5AA3E3"
        personas={personas}
        personaList={[
          { id: 229 },
          { id: 237 },
          { id: 236 }
        ]}
        tile_subtitle="Meet the"
        tile_title="Health Team"
        tile_description="Multiple personalities, one goal: to help you."
      />

      <div className="flex flex-wrap mt-12 mb-10 text-center">
        <div className="w-full m-12 p-4 shadow-plus-shadow rounded-full gap-1 border-border-outline">
          <StaticCard 
            className="bg-transparent" 
            title="Suggest a Persona" 
            desc="Share your ideas to add/enhance our personas! Your feedback helps us improve and innovate." 
            href="/suggest" 
          />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PersonaList;