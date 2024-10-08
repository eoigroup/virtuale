"use client";

import React from "react";
import PersonaCard from "../persona-card/persona-card";
import { usePersona } from "@/contexts/persona-context";
import PersonaLoading from "./persona-loading";

const PersonaList = () => {
  const { personas, loading } = usePersona();

  if (loading) {
    return <PersonaLoading />;
  }

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
