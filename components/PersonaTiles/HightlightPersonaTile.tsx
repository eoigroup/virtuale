"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { IPersona } from "@/types/persona";
import { Typography } from "../ui/typography";
import PersonaImage from "../persona-image/persona-image";

interface PersonaTileProps {
    topLabel?: string;
    backImage: string;
    backColour: string;
    buttonColour: string;
    personas: IPersona[];
    personaList: Array<{ id: number }>;
    tile_subtitle?: string;
    tile_title?: string;
    tile_description?: string;
    imagePosition?: string;
}

const PersonaTile = ({
    topLabel = "NOW AVAILABLE",
    backImage,
    backColour,
    buttonColour,
    personas,
    personaList,
    tile_subtitle,
    tile_title,
    tile_description,
    imagePosition = "top",
}: PersonaTileProps) => {
    const selectedPersonas = personaList
        .map((item) => personas.find((p) => String(p.persona_id) === String(item.id)))
        .filter((persona): persona is IPersona => persona !== undefined);

    return (
        <Link
            href={`/chat/${selectedPersonas[0]?.persona_id}`}
            className="block relative rounded-3xl overflow-hidden w-full max-w-4xl bg-white/10 my-2 transition-transform hover:scale-[1.01]"
        >
            {/* Main Content Area */}
            <div 
                className="relative w-full h-[300px]"
                style={{ background: `linear-gradient(to bottom, ${backColour} 0%, rgba(0, 0, 0, 0.5) 60%)` }}
            >
                {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-top"
                    style={{ 
                        backgroundImage: `url(${backImage})`,
                        top: imagePosition
                    }}
                />

                {/* Top Label */}
                <div className="uppercase absolute top-4 left-6 z-20 text-xs bg-white text-black font-semibold px-4 py-2 rounded-full">
                    {topLabel}
                </div>

                {/* Fade Overlay */}
                <div 
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, ${backColour} 100%)`,
                    }}
                />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 z-10 px-6 pr-6 p-2 pb-2">
                    <h4 className="text-2xl font-bold text-white mb-0 leading-none drop-shadow-md"
                     style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)' }}>
                        {tile_subtitle}
                    </h4>
                    <h2 className="text-4xl font-bold text-white mb-1 leading-none drop-shadow-md"
                     style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)' }}>
                        {tile_title}
                    </h2>
               
                   

                    <p className="text-sm text-white/90 mb-3 drop-shadow-md"
                     style={{ textShadow: '3px 3px 6px rgba(0, 0, 0, 0.9)' }} >
                        {selectedPersonas[0]?.profile_about}
                    </p>
                </div>
            </div>

            {/* Bottom Section */}
            <div
                className="pt-1 pb-1" 
                style={{ backgroundColor: backColour }}
            >
                {selectedPersonas.map((persona) => (
                    <div 
                        key={persona.persona_id}
                        className="pt-1 mb-2 mx-auto w-[95%] flex gap-2 rounded-full py-1 pl-0 pr-4 bg-[#e4e4e7] dark:bg-[#26272b]"
                    >
                        <div className="w-[90px] pl-2">
                            <PersonaImage
                                image={persona.profile_image}
                                width={100}
                                height={80}
                                className="w-[100px] h-[80px] object-cover rounded-full -ml-2"
                                alt={persona.name}
                            />
                        </div>

                        <div className="flex-1 flex flex-col justify-center -ml-1">
                            <Typography variant="xsmall" className="text-gray-400 mb-1 block">
                                {persona.category_name}
                            </Typography>
                            <Typography variant="small" className="dark:text-white text-black text-lg font-semibold mb-1 leading-none">
                                Speak to Santa—he loves to chat! Ho, ho, ho!
                            </Typography>
                            <Typography variant="xsmall" className="text-gray-400 line-clamp-2 text-ellipsis overflow-hidden whitespace-normal break-anywhere mb-1">
                                {persona.profile_about}
                            </Typography>
                        </div>
                    </div>
                ))}
            </div>
        </Link>
    );
};

export default PersonaTile;
