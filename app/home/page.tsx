import Banner from "@/components/banner/banner";
import PersonaList from "@/components/persona-list/persona-list";
import { PERSONA_ACTIONS } from "@/lib/actions";
import { AGENT_API_KEY, AGENT_AUTHOR, API_URL } from "@/lib/config";
import dynamic from "next/dynamic";
import React from "react";
const LandingHeader = dynamic(
  () => import("@/components/landing-header/landing-header"),
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
    redirect: "follow",
  };

  const response = await fetch(`${API_URL}/api/personas`, requestOptions);
  const res = await response.json();
  const personas = res.data;

  return (
    <>
      <LandingHeader />
      <main className="py-4 pt-[85px] md:pt-[85px] md:py-10 px-3 max-w-7xl mx-auto">
        <Banner loading={false} personas={personas} />

        <PersonaList personas={personas} />
      </main>
    </>
  );
};

export default HomePage;
