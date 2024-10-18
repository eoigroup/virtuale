import React, { useEffect, useState } from "react";
import { Typography } from "../ui/typography";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import PersonaCard from "../persona-card/persona-card";
import { ICategory, IPersona } from "@/types/persona";
import { toast } from "sonner";
import { getPersonaCategories } from "@/lib/api/persona";
import { Button } from "../ui/button";

const FeaturedPersonas = ({ personas }: { personas: IPersona[] }) => {
  // const [categories, setCategories] = useState<ICategory[]>([]);

  // const getCategories = async () => {
  //   try {
  //     const response = await getPersonaCategories();
  //     setCategories(response.data);
  //   } catch (error: any) {
  //     toast.error(error.message || "Error fetching categories");
  //   }
  // };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <div className="mt-10">
      {/* <div className="flex items-center">
        {categories.map((category) => (
          <Button key={`category-${category.id}`} variant={"outline"}>
            {category.category}
          </Button>
        ))}
      </div> */}

      <Typography variant={"h5"} className="mb-4 ml-4">
        Featured
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
          <SwiperSlide key={`feature-${persona.persona_id}`}>
            <PersonaCard persona={persona} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FeaturedPersonas;
