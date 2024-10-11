"use client";

import React from "react";
import PersonaCard from "../persona-card/persona-card";
import { usePersona } from "@/contexts/persona-context";
import PersonaLoading from "./persona-loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { Typography } from "../ui/typography";

const PersonaList = () => {
  const { personas, loading } = usePersona();

  if (loading) {
    return <PersonaLoading />;
  }

  return (
    <div className="mt-10">
      <Typography variant={"h5"} className="mb-4 ml-4">
        For you
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
        {personas.map((persona) => (
          <SwiperSlide key={persona.persona_id}>
            <PersonaCard persona={persona} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PersonaList;
