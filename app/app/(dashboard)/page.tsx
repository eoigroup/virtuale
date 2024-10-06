import PersonaList from "@/components/persona-list/persona-list";
import { Typography } from "@/components/ui/typography";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <Typography variant={"h6"} className="font-normal text-muted-foreground">
        Welcome back,
      </Typography>

      <PersonaList />
    </div>
  );
};

export default DashboardPage;
