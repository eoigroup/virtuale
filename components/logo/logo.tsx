import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";
import { AudioLines } from "lucide-react";


const Logo = () => {
  return (
    <Link href={"/"} className="flex-1">
      <Typography variant={`h4`} className="font-bold" as={"div"}>
          <div className="flex">
            <AudioLines size={12} className="text-yellow-400 font-bold mr-2 mt-2 " />  Virtuale.ai
          </div>
      </Typography>
    </Link>
  );
};

export default Logo;
