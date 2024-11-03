import React, { ReactNode } from "react";
import Providers from "./providers";
import DashboardLayout from "./dash-layout";
import { AGENT_API_KEY, AGENT_AUTHOR, API_URL } from "@/lib/config";
import { PERSONA_ACTIONS } from "@/lib/actions";
import { IPersona } from "@/types/persona";

const body: BodyInit = new FormData();
body.append("action", PERSONA_ACTIONS.GET_ALL_VIRTUALE_PERSONAS);

const DashLayout = async ({ children }: { children: ReactNode }) => {
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
  if (!response.ok) {
    return "Something went wrong";
  }
  const res = await response.json();
  const personas = res.data.filter((p: IPersona) => p.virtuale_ai_enable);

  return (
    <Providers key="dashboard-providers">
      <DashboardLayout personas={personas}>{children}</DashboardLayout>
    </Providers>
  );
};

export default DashLayout;
