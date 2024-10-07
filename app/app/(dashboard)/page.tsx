import PersonaList from "@/components/persona-list/persona-list";
import { Typography } from "@/components/ui/typography";
import React from "react";

const DashboardPage = () => {
  return (
    <div className="py-10 max-w-7xl mx-auto">
      <Typography variant={"h6"} className="font-normal text-muted-foreground">
        Welcome back,
      </Typography>

      <PersonaList />
    </div>
  );
};

export default DashboardPage;
