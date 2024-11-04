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
    <div id="PersonaTiles" className="pt-10">
      <Swiper
        spaceBetween={24}
        modules={[FreeMode, Navigation, Autoplay]}
        navigation
        loop={true}
        watchSlidesProgress={true} 
        autoplay={{
          delay: 4000,
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
              { id: 149 },
              { id: 136 }
            ]}
         
          />
        </SwiperSlide>

        <SwiperSlide>
          <PersonaTile
            topLabel="creative"
            tile_subtitle="Expand Imagination"
            tile_title="Story Telling"
            tile_description="Step into worlds unknown with unique personas."
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-themastermind.jpg"
            imagePosition="-20px"
            backColour="#1c1d1b"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 166 },
              { id: 175 },
              { id: 166 }
            ]}
         
          />
        </SwiperSlide>

        <SwiperSlide>
          <PersonaTile
            topLabel="productivity"
            tile_subtitle="Be more"
            tile_title="Productive"
            tile_description="Chat with experts who help you stay on track."
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-thebrainstormer.jpeg"
            imagePosition="-100px"
            backColour="#95b5b4"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 235 },
              { id: 151 },
              { id: 181 },
              { id: 136 }
            ]}
          />
        </SwiperSlide>

        <SwiperSlide>
          <PersonaTile
            topLabel="health"
            tile_subtitle="Look after your"
            tile_title="Health"
            tile_description="Friendly guidance to support your overall well-being."
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-nurse2.jpg"
            imagePosition="-80px"
            backColour="#7a9593"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 154 },
              { id: 171 },
              { id: 139 },
              { id: 140 }
            ]}
          />
        </SwiperSlide>

        <SwiperSlide>
          <PersonaTile
            topLabel="Companions"
            tile_subtitle="Have fun wth"
            tile_title="Companions"
            tile_description="Engage with personalities who bring joy and connection."
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-olivia.jpg"
            imagePosition="-80px"
            backColour="#282720"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 171 },
              { id: 139 },
              { id: 140 }
            ]}
          />
        </SwiperSlide>

        <SwiperSlide>
          <PersonaTile
            topLabel="Support"
            tile_subtitle="Get help with"
            tile_title="Emotional Support"
            tile_description="Caring personas here to listen and uplift you."
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-therapist.jpeg"
            imagePosition="-110px"
            backColour="#7a9593"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 201 },
              { id: 216 }
            ]}
          />
        </SwiperSlide>

        <SwiperSlide>
          <PersonaTile
            topLabel="Adult"
            tile_subtitle="Over 18"
            tile_title="After Hours"
            tile_description="Get your heart racing with personas that push your buttons"
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-therapist.jpeg"
            backColour="#950000"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 201 },
              { id: 216 }
            ]}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CharacterPersonaTile;
