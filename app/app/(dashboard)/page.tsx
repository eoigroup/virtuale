import { Typography } from "@/components/ui/typography";
import React from "react";
import dynamic from "next/dynamic";
import Banner from "@/components/banner/banner";
const PersonaList = dynamic(() => import("@/components/persona-list/persona-list"), {ssr: false})

const DashboardPage = () => {
  return (
    <div className="py-10 max-w-7xl mx-auto">
      <Typography variant={"h6"} className="font-normal text-muted-foreground">
        Welcome back,
      </Typography>
      <Banner />
      <PersonaList />
    </div>
  );
};

export default DashboardPage;
