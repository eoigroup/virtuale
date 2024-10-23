"use client";

import React from "react";
import PersonaCard from "../persona-card/persona-card";
import PersonaLoading from "./persona-loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { Typography } from "../ui/typography";
import PersonaSecondaryCard from "../persona-card/persona-secondary-card";
import PromptSuggestionCard from "../persona-card/prompt-suggestion-card";
import { IPersona, IUserConvos } from "@/types/persona";
import CategoryList from "./category-list";
import FeaturedPersonas from "./featured-personas";

const PersonaList = ({
  personas,
  loading = false,
  userConvos = [],
}: {
  personas: IPersona[];
  loading?: boolean;
  userConvos?: IUserConvos[];
}) => {
  const forYouPersonas = personas.filter((p) =>
    userConvos.some((u) => u.persona_id === p.persona_id)
  );
  const featuredPersonas = personas.filter((p) => p.virtuale_featured);
  const tryThese = personas.filter((p) => p.virtuale_trythese);
  const promptSuggestionPersonas = personas.filter((p) => {
    if (!p.agent_suggested_questions) return false;
    const suggestions = p.agent_suggested_questions.split("@");
    return suggestions.length >= 2;
  });

  if (loading) {
    return <PersonaLoading />;
  }

  return (
    <>
      {forYouPersonas && forYouPersonas.length > 0 && (
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
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {tryThese.slice(0, 8).map((persona) => (
            <PersonaSecondaryCard
              key={`try-${persona.persona_id}`}
              persona={persona}
            />
          ))}
        </div>
      </div>

      <FeaturedPersonas personas={personas} featuredPersonas={featuredPersonas} />

      <CategoryList personas={personas} />

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
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="self-swiper"
        >
          {promptSuggestionPersonas.map((persona) => (
            <SwiperSlide key={`feature-${persona.persona_id}`}>
              <PromptSuggestionCard persona={persona} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default PersonaList;
