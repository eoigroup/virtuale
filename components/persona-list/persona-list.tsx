"use client";

import React from "react";
import PersonaCard from "../persona-card/persona-card";
import StaticCard from "../static-card/static-card";
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

      <div className="flex flex-wrap mt-12 mb-10 text-center">

{/* Suggest Card */}
<div className="w-full m-12 p-4 shadow-plus-shadow rounded-full gap-1 border-border-outline"> 
<StaticCard className="bg-transparent" title="Suggest a Persona" desc="Share your ideas to add/enhance our personas! Your feedback helps us improve and innovate." href="/suggest" />
</div>

</div>


            <div className="mt-10 mb-10">
              <Typography variant={"h5"} className="mb-4 ml-4 pt-10 border-t border-gray-800" >   
                More Info
              </Typography>

              <div className="flex flex-wrap">


                {/* Left Column */}
                <div className="w-full md:w-1/2 flex flex-col"> 
                <div className="flex w-full items-stretch"> {/* Ensure equal height */}
                    <div className="flex-1 p-2"> {/* Suggest */}
                    <StaticCard title="Support" desc="Need assistance? Our support team is here to help with any issues." href="/support" />
                    </div>
                    <div className="flex-1 p-2"> {/* FAQ */}
                      <StaticCard title="FAQ" desc="Have questions? We have the answers!" href="/faq" />
                    </div>
                  </div>
                  <div className="flex w-full mt-2">
                    <div className="w-1/2 p-2"> {/* New Card 1 */}
                      <StaticCard title="Partnerships" desc="Explore collaboration opportunities." href="/partnerships" />
                    </div>
                    <div className="w-1/2 p-2"> {/* New Card 2 */}
                      <StaticCard title="Latest News" desc="Stay updated with our latest announcements." href="/news" />
                    </div>
                  </div>
                  <div className="hidden md:flex w-full mt-2 "> {/* Additional Row for About and Legal */}
                    <div className="w-1/2 p-2"> {/* About */}
                      <StaticCard title="Company" desc="" href="" />
                    </div>
                    <div className="w-1/2 p-2"> {/* Legal */}
                      <StaticCard title="Jargon" desc="" href="" />
                    </div>
                  </div>
                </div>

                {/* Community Card */}
                <div className="w-full md:w-1/2 p-2 flex"> 
                  <StaticCard title="Community" desc="Connect with fellow users, share your experiences, and stay updated with us!" className="flex-1 h-full" />
                </div>

                <div className="w-full md:w-1/2 flex flex-col"> 
                  <div className="flex w-full mt-2 md:hidden"> {/* Additional Row for About and Legal */}
                    <div className="w-1/2 p-2"> {/* About */}
                      <StaticCard title="Company" desc="" href="" />
                    </div>
                    <div className="w-1/2 p-2"> {/* Legal */}
                      <StaticCard title="Jargon" desc="" href="" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

    </>
  );
};

export default PersonaList;
