"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import React from "react";
import { Toaster as SToaster } from "sonner";

const Toaster = () => {
  const { theme, systemTheme } = useTheme();
  const isDark = theme === "dark" || systemTheme === "dark";

  return (
    <SToaster
      toastOptions={{
        classNames: {
          icon: "text-primary",
          default: cn("top-10  text-foreground shadow-primary", {
            "bg-muted border-none": isDark,
          }),
        },
        duration: 15000,
      }}
      position="top-right"
    />
  );
};

export default Toaster;
