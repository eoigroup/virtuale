import React from "react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { Contrast, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();
  const variant = (key: string) => {
    if (key === theme) {
      return "outline";
    }

    return "default";
  };

  const handleChangeMode = (mode: string) => {
    setTheme(mode);
  };

  return (
    <div className="flex flex-col gap-2">
      <Typography as={"p"} variant={"xsmall"}>
        Theme
      </Typography>

      <div className="flex flex-col md:flex-row gap-4">
        <Button
          variant={variant("system")}
          className="flex gap-1"
          onClick={() => handleChangeMode("system")}
        >
          <Contrast size={16} /> System
        </Button>
        <Button
          variant={variant("light")}
          className="flex gap-1"
          onClick={() => handleChangeMode("light")}
        >
          <Sun size={16} />
          Light
        </Button>
        <Button
          variant={variant("dark")}
          className="flex gap-1"
          onClick={() => handleChangeMode("dark")}
        >
          <Moon size={16} />
          Dark
        </Button>
      </div>
    </div>
  );
};

export default ThemeSettings;
