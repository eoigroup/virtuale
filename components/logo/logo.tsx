import React, { useEffect, useState } from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { AudioLines } from "lucide-react";
import { cn } from "@/lib/utils";


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
  <Typography variant={`h3`} className="font-bold" as={"div"}>

  <div
      className={cn(
        "flex flex-col pt-6 md:pt-0",
        { "pt-0": isScrolled }
      )}
    > {/* Change to flex-col for vertical alignment */}


      <div className="flex items-center"> {/* Align items in the center */}
        <AudioLines size={12} className="text-yellow-400 font-bold mr-2 mt-0" />
        Virtuale.ai
      </div>
      <Typography variant={`caption`} className="ml-0 md:ml-6 -mt-1"> {/* Add tagline */}
      Interactive Conversation &amp; Connection
      </Typography>
    </div>
  </Typography>
</Link>

  );
};

export default Logo;
