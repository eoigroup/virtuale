"use client";

import React from "react";
import { Typography } from "../ui/typography";
import { useUser } from "@/contexts/user-context";

const Version = () => {
  const { user } = useUser();

  return (
    <div className="w-full flex flex-col gap-4">
      <Typography variant={"h3"} className="mb-3">
        {`Version ${user!.creator_tier}`}
      </Typography>
    </div>
  );
};

export default Version;
