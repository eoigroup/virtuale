"use client";

import { MenuProvider } from "@/contexts/menu-context";
import { UserProvider } from "@/contexts/user-context";
import React, { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <MenuProvider>{children}</MenuProvider>{" "}
    </UserProvider>
  );
};

export default Providers;
