"use client";

import React, { useEffect, useState } from "react";
import Logo from "../logo/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const ThemeModeButton = dynamic(() => import("../theme-mode-button/theme-mode-button"), {
  ssr: false,
});

const LandingHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "p-4 fixed h-[75px] z-50 bg-background w-full flex items-center transition-all duration-300",
        { "bg-muted": isScrolled }
      )}
    >
      <Logo />

      <div className="flex items-center gap-4">
        <Link
          href={"/login"}
          className="hover:text-muted-foreground md:text-sm"
        >
          Sign In
        </Link>

        <Link
          href={"/register"}
          className="hover:text-muted-foreground md:text-sm"
        >
          Sign Up
        </Link>

        <ThemeModeButton />
      </div>
    </header>
  );
};

export default LandingHeader;
