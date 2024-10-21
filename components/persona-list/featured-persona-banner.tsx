"use client";

import React from "react";
import HeroPersonaCard from "../persona-card/hero-persona-card";
import { Typography } from "../ui/typography";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { IPersona } from "@/types/persona";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const list = [
  {
    id: 2,
    image: "9448016.jpg",
  },
  {
    id: 119,
    image: "9448031.png",
  },
];

const FeaturedPersonaBanner = ({
  personas,
  loading,
}: {
  personas: IPersona[];
  loading?: boolean;
}) => {
  if (loading) {
    return <Skeleton className="my-6 w-full h-[300px]" />;
  }

  return (
    <div className="w-full mt-10">
      <Typography variant={"h5"} className="mb-4 ml-4">
        Featured
      </Typography>

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
              <motion.div
                className={cn("flex gap-3 flex-col md:flex-row")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {persona && (
                  <HeroPersonaCard persona={persona} className="flex-none md:min-w-[280px]" />
                )}
                <div className="flex-1 rounded-xl overflow-hidden">
                  <Image
                    src={`/${item.image}`}
                    alt=""
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-[280px] object-cover"
                  />
                </div>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default FeaturedPersonaBanner;
