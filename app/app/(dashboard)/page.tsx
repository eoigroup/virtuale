import { Typography } from "@/components/ui/typography";
import React from "react";
import Topbar from "@/components/topbar/topbar";
import Discover from "@/components/discover/discover";

const DashboardPage = () => {
  return (
    <div className="py-4 md:py-10 px-3 max-w-7xl mx-auto">
      <div className="pb-4 pr-2 z-30 bg-background">
        <Topbar />
      </div>
      <Discover />
    </div>
  );
};

export default DashboardPage;
