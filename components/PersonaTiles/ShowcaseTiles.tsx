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
        
        <SwiperSlide key="showcase-characters">
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

        <SwiperSlide key="showcase-creative">
          <PersonaTile
            topLabel="creative"
            tile_subtitle="Expand you Imagination"
            tile_title="Story Telling"
            tile_description="Step into worlds unknown with unique personas."
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-thecrossovercreator.jpg"
            imagePosition="-20px"
            backColour="#1c1d1b"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 166 },
              { id: 175 }
            ]}
         
          />
        </SwiperSlide>

        <SwiperSlide key="showcase-alien">
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
        
        <SwiperSlide key="showcase-professioanl">
          <PersonaTile
            topLabel="Business"
            tile_subtitle="Get more done"
            tile_title="Professional Assist"
            tile_description="Legal or Strategy , we got you coverered"
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-legaleagle.jpg"
            imagePosition="-50px"
            backColour="#950000"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 167 },
              { id: 225 }
            ]}
          />
        </SwiperSlide>
        
           
        <SwiperSlide key="showcase-mystical">
          <PersonaTile
            topLabel="spiritual"
            tile_subtitle="Power of the universe"
            tile_title="Mystical"
            tile_description="Chat with experts who help you stay on track."
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-sage.jpg"
            imagePosition="-50px"
            backColour="#f8c969"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 144 },
              { id: 168 }
            ]}
          />
        </SwiperSlide>
        
        
              <SwiperSlide key="showcase-productivity">
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
              { id: 151 }
            ]}
          />
        </SwiperSlide>

        <SwiperSlide key="showcase-health">
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
              { id: 140 },
              { id: 154 }
            ]}
          />
        </SwiperSlide>

        <SwiperSlide key="showcase-parents">
          <PersonaTile
            topLabel="Parents"
            tile_subtitle="Feel supported"
            tile_title="Parenting"
            tile_description="Friendly guidance to support your overall well-being."
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-parentingexpert.jpg"
            imagePosition="-80px"
            backColour="#7a9593"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 207 },
              { id: 171 }
            ]}
          />
        </SwiperSlide>        

       
        <SwiperSlide key="showcase-companions">
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
              { id: 5 },
              { id: 184 }
            ]}
          />
        </SwiperSlide>

     
        <SwiperSlide key="showcase-support">
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

      
        
            <SwiperSlide key="showcase-adult">
          <PersonaTile
            topLabel="Adult"
            tile_subtitle="Over 18"
            tile_title="After Hours"
            tile_description="Get your heart racing with personas that push your buttons"
            backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-lady-pixelbrook.png"
            imagePosition="-50px"
            backColour="#950000"
            buttonColour="#5AA3E3"
            personas={personas}
            personaList={[
              { id: 5 },
              { id: 5 }
            ]}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default CharacterPersonaTile;
