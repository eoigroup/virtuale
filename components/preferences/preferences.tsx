import React from "react";
import ThemeSettings from "./theme-settings";
import { Typography } from "../ui/typography";

const Preferences = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Typography variant={"h3"} className="mb-3">
        Preferences
      </Typography>

      <ThemeSettings />
    </div>
  );
};

export default Preferences;
