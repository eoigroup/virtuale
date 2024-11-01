"use client";

import React from "react";
import TopPicksPersonaCard from "../persona-card/toppicks-persona-card";
import { Typography } from "../ui/typography";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { IPersona } from "@/types/persona";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import PersonaCard from "../persona-card/persona-card";
import BannerSolo from "../banner/bannersolo_ca6";

const list = [
  {
    id: 238,
    image: "9448016.jpg",
  },
  {
    id: 138,
    image: "9448031.png",
  },
];

const FeaturedPersonas = ({
  personas,
  loading,
  featuredPersonas,
}: {
  personas: IPersona[];
  featuredPersonas: IPersona[];
  loading?: boolean;
}) => {
  if (loading) {
    return <Skeleton className="my-6 w-full h-[300px]" />;
  }

  return (
    <div className="w-full mt-10">
      <Typography variant={"h5"} className="mb-4 ml-4">
      Top Picks
      </Typography>


      <div className="w-full mb-8">
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
          {featuredPersonas.map((persona) => (
            <SwiperSlide key={`feature-${persona.persona_id}`}>
              <PersonaCard persona={persona} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <motion.div
        className={cn("flex gap-3 flex-col md:flex-row")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="md:w-[450px]">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            className="self-swiper"
            loop
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {list.map((item, index) => {
              const persona = personas.find(
                (p) => String(p.persona_id) === String(item.id)
              );

              return (
                <SwiperSlide key={`featured-box-${index}`}>
                  {persona && (
                    <TopPicksPersonaCard
                      persona={persona}
                      className="flex-none md:min-w-[450px]"
                    />
                  )} 
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <div className="flex-1 w-full rounded-xl overflow-hidden">
          
        <BannerSolo /> 
 
        </div>
      </motion.div>


    </div>
  );
};

export default FeaturedPersonas;
