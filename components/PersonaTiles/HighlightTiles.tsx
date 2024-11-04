"use client";

import React from "react";
import PersonaTile from "@/components/PersonaTiles/PersonaTile";
import { IPersona } from "@/types/persona";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

interface CharacterPersonaTileProps {
  personas: IPersona[];
} 

const CharacterPersonaTile = ({ personas }: CharacterPersonaTileProps) => {
  return (
    <div id="PersonaTiles" className="pt-2">
      <Swiper
        spaceBetween={24}
        modules={[FreeMode, Navigation, Autoplay]}
        navigation
        loop={true}
        watchSlidesProgress={true} 
        autoplay={{
          delay: 994000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
          waitForTransition: true
        }}
        breakpoints={{
          // Mobile screens (up to 639px)
          320: { 
            slidesPerView: 1,
            slidesPerGroup: 1, // Slides 1 at a time on mobile
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 100
          },
          // Tablet
          640: { 
            slidesPerView: 2,
            slidesPerGroup: 2, // Slides 2 at a time on tablet
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0
          },
          // Desktop
          1024: { 
            slidesPerView: 3,
            slidesPerGroup: 3, // Slides 3 at a time on desktop
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0
          }
        }}
        className="persona-tiles-swiper"
      >
        <SwiperSlide>
          <PersonaTile
            topLabel="characters"
            tile_subtitle="Immerse yourself with"
            tile_title="Characters"
            tile_description="Step into worlds unknown with unique personas."
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-themastermind.jpg"
            imagePosition="-20px"
            backColour="#1c1d1b"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 130 },
              { id: 149 }
            ]}
         
          />
        </SwiperSlide>

        <SwiperSlide key="special-christmas">
          <PersonaTile
            topLabel="special"
            tile_subtitle="get the kids excited"
            tile_title="for Christmas"
            tile_description="Step into worlds unknown with unique personas."
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-santaclaus.jpg"
            imagePosition="-20px"
            backColour="#1c1d1b"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 238 }
            ]}
         
          />
        </SwiperSlide>

        <SwiperSlide key="special-support">
          <PersonaTile
            topLabel="productivity"
            tile_subtitle="Lets go"
            tile_title="Out of this world"
            tile_description="Chat with experts who help you stay on track."
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-zyx-427.jpg"
            imagePosition="-100px"
            backColour="#95b5b4"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 136 },
              { id: 133 }
            ]}
          />
        </SwiperSlide>
       
      </Swiper>
    </div>
  );
};

export default CharacterPersonaTile;
