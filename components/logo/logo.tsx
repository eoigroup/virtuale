import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { AudioLines } from "lucide-react";


const Logo = () => {
  return (
<Link href={"/"} className="flex-1">
  <Typography variant={`h3`} className="font-bold" as={"div"}>
    <div className="flex flex-col pt-6 md:pt-0"> {/* Change to flex-col for vertical alignment */}
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
