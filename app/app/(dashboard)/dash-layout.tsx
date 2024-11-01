"use client";
import Loader from "@/components/loader/loader";
import Sidebar from "@/components/side-bar/side-bar";
import { useMenu } from "@/contexts/menu-context";
import { usePersona } from "@/contexts/persona-context";
import { useUser } from "@/contexts/user-context";
import { cn } from "@/lib/utils";
import { IPersona } from "@/types/persona";
import React, { ReactNode, useEffect } from "react";

const DashboardLayout = ({
  children,
  personas,
}: {
  children: ReactNode;
  personas: IPersona[];
}) => {
  const { loading } = useUser();
  const { isMenuExpanded } = useMenu();
  const { setPersonas } = usePersona();

  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    window.addEventListener("resize", setViewportHeight);
    setViewportHeight();

    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  useEffect(() => {
    setPersonas(personas);
  }, [personas]);

  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div
        className={cn("transition-width duration-300 w-0 lg:min-w-64 lg:w-64", {
          "lg:w-7 lg:min-w-7": !isMenuExpanded,
        })}
      >
        &nbsp;
      </div>
      <main
        className={cn(
          `flex-1 w-full min-h-screen transition-all overflow-hidden`,
          { "max-w-full": !isMenuExpanded },
          { "lg:max-w-[calc(100%-256px)]": isMenuExpanded }
        )}
      >
        <div className="w-full mx-auto h-full">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
