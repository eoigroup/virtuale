"use client";

import React from "react";
import PersonaTile from "@/components/PersonaTiles/PersonaTile";
import { IPersona } from "@/types/persona";


interface CharacterPersonaTileProps {
  personas: IPersona[]; // Personas prop is passed in, keeping it flexible
}

const CharacterPersonaTile = ({ personas }: CharacterPersonaTileProps) => {
  return (

 
<>
   
    <div className="grid md:hidden grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      <PersonaTile
          // className = grid md:hidden

        topLabel="characters"
        tile_subtitle="Immerse yourself with"
        tile_title="Characters"
        tile_description="Step into worlds unknown with unique personas."
        backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-themastermind.jpg"
        backColour="#1c1d1b"
        buttonColour="#5AA3E3"
        personas={personas}
        personaList={[
          { id: 130 },
          { id: 166 },
          { id: 149 },
          { id: 136 }
        ]}

      />
      </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
      <PersonaTile
       // className = hidden md:grid

        topLabel="characters"
        tile_subtitle="Immerse yourself with"
        tile_title="Characters"
        tile_description="Step into worlds unknown with unique personas."
        backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-themastermind.jpg"
        backColour="#1c1d1b"
        buttonColour="#5AA3E3"
        personas={personas}
        personaList={[
          { id: 130 },
          { id: 166 },
          { id: 149 },
          { id: 136 }
        ]}
      />

      <PersonaTile
        topLabel="productivity"
        tile_subtitle="Be more"
        tile_title="Productive"
        tile_description="Chat with experts who help you stay on track."
        backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-thebrainstormer.jpeg"
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
  
  
  <PersonaTile
        topLabel="health"
        tile_subtitle="Look after your"
        tile_title="Health"
        tile_description="Friendly guidance to support your overall well-being."
        backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-nurse2.jpg"
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

        
  <PersonaTile
        topLabel="Companions"
        tile_subtitle="Have fun wth"
        tile_title="Companions"
        tile_description="Engage with personalities who bring joy and connection."
        backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-olivia.jpg"
        backColour="#282720"
        buttonColour="#5AA3E3"
        personas={personas}
        personaList={[
          { id: 175 },
          { id: 171 },
          { id: 139 },
          { id: 140 }
        ]}
      />


        
<PersonaTile
        topLabel="Support"
        tile_subtitle="Get help with"
        tile_title="Emotional Support"
        tile_description="Caring personas here to listen and uplift you."
        backImage="https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-therapist.jpeg"
        backColour="#7a9593"
        buttonColour="#5AA3E3"
        personas={personas}
        personaList={[
            { id: 201 },
            { id: 216 }

        ]}
      />

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

       </div>

</>

  );
};

export default CharacterPersonaTile;
