"use client";

import Link from "next/link";
import React from "react";
import { Typography } from "../ui/typography";
import { Button } from "../ui/button";
import { AlignLeft, ChevronsLeft, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMenu } from "@/contexts/menu-context";
import ChatList from "./chat-list";
import { usePathname } from "next/navigation";
import UserMenu from "../user-menu/user-menu";

const Sidebar = () => {
  const { isMenuExpanded, setIsMenuExpanded } = useMenu();
  const handleToggle = () => {
    setIsMenuExpanded((prev) => !prev);
  };

  const pathname = usePathname();

  return (
    <aside className="h-dvh fixed z-50">
      <div className="w-full h-full flex">
        <div
          className={cn(
            "overflow-hidden transition-all ease-out duration-300 bg-muted border-r border-r-border-divider z-20 fixed inset-0 lg:static h-screen lg:h-full",
            {
              "max-w-64": isMenuExpanded, // Expanded state
              "max-w-0 -translate-x-full lg:max-w-64": !isMenuExpanded, // Collapsed state for mobile
            }
          )}
        >
          <div className="h-full border-r border-r-border-divider w-64">
            <div className="flex h-full flex-col overflow-hidden bg-muted border-r-border-divider w-full">
              <div className="pl-6 pt-4 flex w-full items-center">
                <Link href={"/"} className="flex-1">
                  <Typography variant={`h4`}>Virtuale</Typography>
                </Link>

                <Button
                  variant={`link-outlined`}
                  className="w-fit p-0 mr-4"
                  onClick={handleToggle}
                >
                  <ChevronsLeft size={16} />
                </Button>
              </div>
              <div className="p-4 w-full">
                <Link
                  href={"/"}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 rounded-md",
                    "transform duration-200 hover:bg-primary/90",
                    { "bg-primary": pathname === "/" }
                  )}
                >
                  <Compass size={24} />
                  Discover
                </Link>
              </div>
              <ChatList />
              <UserMenu />
            </div>
          </div>
        </div>

        {!isMenuExpanded && (
          <div className="m-4 flex items-center absolute z-10">
            <Button
              variant={`link-outlined`}
              className="w-fit p-0 h-auto"
              onClick={handleToggle}
            >
              <AlignLeft />
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
