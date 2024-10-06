"use client";

import React from "react";
import PersonaCard from "../persona-card/persona-card";
import { usePersona } from "@/contexts/persona-context";

const PersonaList = () => {
  const { personas } = usePersona();

  return (
    <div className="mt-10 grid grid-cols-4 gap-4">
      {personas.map((persona) => (
        <div key={persona.persona_id} className="col-span-1">
          <PersonaCard persona={persona} />
        </div>
      ))}
    </div>
  );
};

export default PersonaList;
