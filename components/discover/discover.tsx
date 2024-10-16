"use client";

import { usePersona } from "@/contexts/persona-context";
import dynamic from "next/dynamic";
import Banner from "../banner/banner";
const PersonaList = dynamic(
  () => import("@/components/persona-list/persona-list"),
  { ssr: false }
);

const Discover = () => {
  const { personas, userConvos, loading } = usePersona();

  return (
    <>
      <Banner loading={loading} personas={personas} />

      <PersonaList
        loading={loading}
        personas={personas}
        userConvos={userConvos}
      />
    </>
  );
};

export default Discover;
