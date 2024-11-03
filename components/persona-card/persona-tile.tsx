"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { IPersona } from "@/types/persona";
import { Typography } from "../ui/typography";



interface PersonaTileProps {
    topLabel?: string;
    backImage: string;
    backColour: string;
    buttonColour: string;
    personas: IPersona[];
    personaList: Array<{ id: number }>; // Add this new prop
    tile_subtitle?: string;
    tile_title?: string;
    tile_description?: string;
  }
   
  const PersonaTile = ({
    topLabel = "NOW AVAILABLE",
    backImage,
    backColour,
    buttonColour,
    personas,
    personaList, // Add this to props
    tile_subtitle,
    tile_title,
    tile_description,
  }: PersonaTileProps) => {
    const selectedPersonas = personaList
      .map((item) => {
        const persona = personas.find(
          (p) => String(p.persona_id) === String(item.id)
        );
        return persona;
      })
      .filter((persona): persona is IPersona => persona !== undefined);


  return (
    <div className="md:hidden relative rounded-3xl overflow-hidden w-full max-w-4xl bg-white/10 my-20">
      {/* Main Content Area */}
      <div 
  className="relative w-full aspect-[16/9]" 
  style={{ background: `linear-gradient(to bottom, ${backColour} 0%, rgba(0, 0, 0, 0.5) 60%)` }}
>
        {/* Top Label */}
        <div className="absolute top-4 left-6 z-20">
          <div className="text-xs bg-white text-black font-semibold px-4 py-2 rounded-full">
            {topLabel}
          </div>
        </div>

        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${backImage})`,
            opacity: '0.9'
          }}
        />
            
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <h4 
    className="text-3xl font-bold text-white mb-0"
    style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)' }}
  >
    {tile_subtitle}
  </h4>
    <h2 
    className="text-4xl font-bold text-white mb-0"
    style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)' }}
  >
    {tile_title}
  </h2>
  <p 
    className="text-xl text-white/90 mb-3"
    style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)' }}
  >
    {tile_description}
  </p>
</div>

      </div>

      {/* Add gradient overlay div before the rows */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-24 z-10"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${backColour} 100%)`
        }}
      />

      {/* Multiple Bottom App Info Rows */}
      <div className="divide-y divide-white/10 relative z-20 ">
        {selectedPersonas.map((persona, index) => (
                <div 
                key={persona.persona_id}
                className={`
                flex items-center justify-between px-6 py-4 
                ${index === 0 ? 'bg-opacity-60' : 'bg-opacity-80'} 
                backdrop-blur-sm transition-all duration-300
                `}
                style={{ backgroundColor: backColour }}
                >
            <div className="flex items-center gap-4">
              {/* Persona/App Icon */}
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden">
                <Image
                  src={persona.profile_image}
                  alt={persona.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Text Info */}
              <div className="flex flex-col">

              <Typography 
                    variant="xsmall"
                    className="text-white-400 mb-1 block"
                    >
                    {persona.category_name}
                </Typography>

                <Typography 
                    variant="small" 
                    className="text-lg font-semibold mb-1 leading-none"
                    >
                    {persona.name}
                    </Typography>
  
                    <Typography
                    variant="xsmall"
                    className="text-white-400 line-clamp-2 text-ellipsis overflow-hidden whitespace-normal break-anywhere"
                    >
                    {persona.profile_about}
                    </Typography>
       
              </div>
            </div>

            {/* Get Button */}
            <Button 
              asChild
                className={`bg-[${buttonColour}] hover:bg-[${buttonColour}/90] text-sm text-white px-2`}

            >
              <Link href={`/chat/${persona.persona_id}`}>
                Chat
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonaTile;