import React from "react";
import { Typography } from "../ui/typography";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex-1">
      <Typography variant={`h4`} className="font-bold" as={"div"}>
        Virtuale.ai
      </Typography>
    </Link>
  );
};

export default Logo;
