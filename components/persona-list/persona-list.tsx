"use client";

import React from "react";
import PersonaCard from "../persona-card/persona-card";
import { usePersona } from "@/contexts/persona-context";
import PersonaLoading from "./persona-loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";

const PersonaList = () => {
  const { personas, loading } = usePersona();

  if (loading) {
    return <PersonaLoading />;
  }

  return (
    <div className="mt-10 ">
      <Swiper
        spaceBetween={10}
        modules={[FreeMode]}
        freeMode={true}
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
