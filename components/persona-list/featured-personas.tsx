"use client";

import React, { useEffect, useState } from "react";
import { Typography } from "../ui/typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import PersonaCard from "../persona-card/persona-card";
import { ICategory, IPersona } from "@/types/persona";
import { toast } from "sonner";
import { getPersonaCategories } from "@/lib/api/persona";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const FeaturedPersonas = ({ personas }: { personas: IPersona[] }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [_personas, setPersonas] = useState<IPersona[]>(personas);
  const [activeCategory, setActiveCategory] = useState<string>("");

  const getCategories = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await getPersonaCategories();
      setCategories(response.data);
    } catch (error: any) {
      toast.error(error.message || "Error fetching categories");
    }
    setLoading(false);
  };

  const handleFilterPersona = (category: string) => {
    if (category === activeCategory) {
      setActiveCategory("");
      setPersonas(personas);
    } else {
      setActiveCategory(category);
      setPersonas(
        personas.filter((persona) => persona.agent_category === category)
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="mt-10">
      <Typography variant={"h5"} className="mb-4 ml-4">
        Featured
      </Typography>

      <div className="flex items-center overflow-auto gap-2 py-1 mb-4">
        {!loading
          ? categories.map((category) => (
              <Button
                key={`category-${category.id}`}
                variant={
                  activeCategory === category.category ? "default" : "outline"
                }
                onClick={() => handleFilterPersona(category.category)}
              >
                {category.category}
              </Button>
            ))
          : [...Array(6)].map((el, index) => (
              <Skeleton
                key={`category-loading-${index}`}
                className="w-[110px] h-10 rounded-md"
              />
            ))}
      </div>

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
        {_personas.map((persona) => (
          <SwiperSlide key={`feature-${persona.persona_id}`}>
            <PersonaCard persona={persona} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedPersonas;
