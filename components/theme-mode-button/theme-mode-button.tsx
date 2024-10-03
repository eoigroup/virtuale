"use client";

import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeModeButton = ({ className = "" }: { className?: string }) => {
  const { setTheme, theme } = useTheme();

  const handleChangeMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      type="button"
      variant={`link`}
      onClick={handleChangeMode}
      className={className}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};

export default ThemeModeButton;
