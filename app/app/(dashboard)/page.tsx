import { Typography } from "@/components/ui/typography";
import React from "react";
import dynamic from "next/dynamic";
import Banner from "@/components/banner/banner";
import Topbar from "@/components/topbar/topbar";
const PersonaList = dynamic(
  () => import("@/components/persona-list/persona-list"),
  { ssr: false }
);

const DashboardPage = () => {
  return (
    <div className="py-10 max-w-7xl mx-auto">
      <div className="pb-4 pr-2 z-30 bg-background">
        <Typography
          variant={"h6"}
          className="font-normal text-muted-foreground"
        >
          Welcome back,
        </Typography>

        <Topbar />
      </div>
      <Banner />
      <PersonaList />
    </div>
  );
};

export default DashboardPage;
