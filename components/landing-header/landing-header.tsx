"use client";

import React, { useEffect, useState } from "react";
import Logo from "../logo/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Button } from "../ui/button";


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
        "p-4 fixed h-[75px] z-50 bg- w-full flex items-center transition-all duration-300",
        { "bg-muted": isScrolled }
      )}
    >
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        <Logo />

        <div className="flex items-center gap-4">
          
              <Link href={"/register"}>
            <Button
              variant={"outline"}
              position={"default"}
              className="hover:shadow-plus-shadow rounded-full gap-1 border-border-outline"
              type="button"
            >
              Sign Up to Chat
            </Button>
          </Link>

          <Link href={"/login"}>
            <Button
              variant={"outline"}
              position={"default"}
              className="hover:shadow-plus-shadow rounded-full gap-1 border-border-outline"
              type="button"
            >
              Login
            </Button>
          </Link>

          <ThemeModeButton />
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
