import PersonaList from "@/components/persona-list/persona-list";
import { PERSONA_ACTIONS } from "@/lib/actions";
import { AGENT_API_KEY, AGENT_AUTHOR, API_URL } from "@/lib/config";
import { IPersona } from "@/types/persona";
import dynamic from "next/dynamic";
import React from "react";
const LandingHeader = dynamic(
  () => import("@/components/landing-header/landing-header"),
  { ssr: false }
);
const Banner = dynamic(
  () => import("@/components/banner/banner"),
  { ssr: false }
);

const body: BodyInit = new FormData();
body.append("action", PERSONA_ACTIONS.FETCH_ALL_PERSONAS);

const HomePage = async () => {
  const requestOptions: RequestInit = {
    method: "POST",
    headers: {
      Authorization: `Api-Key ${AGENT_API_KEY}`,
      author: AGENT_AUTHOR,
      ContentType: "multipart/form-data",
    },
    body: body,
  };

  const response = await fetch(`${API_URL}/api/personas`, requestOptions);
  console.log('response', response)
  console.log('requestOptions', requestOptions)
  if (!response.ok) {
    return "Something went wrong";
  }
  const res = await response.json();
  const personas = res.data.filter((p: IPersona) => p.virtuale_ai_enable);

  return (
    <>
      <LandingHeader />
      <main className=" px-3 max-w-7xl mx-auto">
        <Banner loading={false} personas={personas} />

        <PersonaList personas={personas} />
      </main>
    </>
  );
};

export default HomePage;
