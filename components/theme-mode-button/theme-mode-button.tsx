"use client";

import React from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

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
      className={cn(className, "p-0 h-auto")}
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </Button>
  );
};

export default ThemeModeButton;
