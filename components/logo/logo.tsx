import React, { useEffect, useState } from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { AudioLines } from "lucide-react";
import { cn } from "@/lib/utils";
import VELogo from "@/components/ui/logo";

const Logo = () => {
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
    <Link href={"/"} className="flex-1">
      <Typography variant="h3" className="font-bold -mt-5 md:-mt-0" as="div">
        <div
          className={cn(
            "flex items-start pt-1 md:pt-0",
            { "pt-0 -mt-7 md:-mt-0": isScrolled }
          )}
        >
          <div className="relative">
            <div className="flex items-center">
              <VELogo className="h-8 w-12 text-primary mt-0 md:hidden" />
              <VELogo className="h-12 w-12 text-primary mt-0 hidden md:block" />
              <span className="text-sm leading-none ml-3 mt-5  md:hidden ">VirtualEra.ai</span>
            </div>
            <Typography 
              variant="caption" 
              className="text-muted-foreground text-xs leading-none absolute pt-1 left-0  md:hidden whitespace-nowrap"
            >
              Interactive Conversation <br /> &amp; Meaningful Connection.
            </Typography>
          </div>
          
          <div className="flex flex-col mt-2 ml-3">
      
            <span className="text-md leading-none hidden md:block">VirtualEra.ai</span>
            <Typography 
              variant="caption" 
              className="text-muted-foreground text-xs leading-none hidden md:block"
            >
              Interactive Conversation &amp; Meaningful Connection.
            </Typography>
          </div>
        </div>
      </Typography>
    </Link>
  );
};

export default Logo;
