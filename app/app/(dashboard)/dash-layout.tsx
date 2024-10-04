"use client";
import Loader from "@/components/loader/loader";
import Sidebar from "@/components/side-bar/side-bar";
import { useMenu } from "@/contexts/menu-context";
import { useUser } from "@/contexts/user-context";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { loading } = useUser();
  const { isMenuExpanded } = useMenu();

//   if (loading) {
//     return (
//       <div className="w-screen h-screen flex justify-center items-center">
//         <Loader />
//       </div>
//     );
//   }

  return (
    <div className="flex">
      <Sidebar />
      <div
        className={cn("transition-width duration-300 w-0 lg:w-64", {
          "lg:w-7": !isMenuExpanded,
        })}
      >
        &nbsp;
      </div>
      <main
        className={cn(
          "p-4 md:p-8",
          `flex-1 min-h-screen transition-all md:ml-7`,
          { "max-w-full": !isMenuExpanded },
          { "max-w-[calc(100%-256px)]": isMenuExpanded }
        )}
      >
        <div className="max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
