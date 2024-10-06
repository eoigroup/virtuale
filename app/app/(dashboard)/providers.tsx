"use client";

import { MenuProvider } from "@/contexts/menu-context";
import { PersonaProvider } from "@/contexts/persona-context";
import { UserProvider } from "@/contexts/user-context";
import React, { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <MenuProvider>
        <PersonaProvider>{children}</PersonaProvider>
      </MenuProvider>
    </UserProvider>
  );
};

export default Providers;
