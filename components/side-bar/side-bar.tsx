"use client";

import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { AlignLeft, ChevronsLeft, Compass, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMenu } from "@/contexts/menu-context";
import ChatList from "./chat-list";
import { usePathname, useRouter } from "next/navigation";
import UserMenu from "../user-menu/user-menu";
import Logo from "../logo/logo";

const Sidebar = () => {
  const { isMenuExpanded, setIsMenuExpanded } = useMenu();
  const router = useRouter();

  const handleToggle = () => {
    setIsMenuExpanded((prev) => !prev);
  };

  const handleOnClick = () => {
    router.push("/persona/new");
  };

  const pathname = usePathname();

  return (
    <>
      <aside className={cn("h-dvh fixed z-50", { "lg:z-0": !isMenuExpanded })}>
        <div className="w-fit h-full flex">
          {isMenuExpanded && (
            <div
              className="block lg:hidden fixed bg-black/60 w-screen h-screen"
              onClick={handleToggle}
            />
          )}

          <div
            className={cn(
              "overflow-hidden transition-[max-width,transform] ease-out duration-300 bg-primary-foreground border-r border-r-border-divider z-20 fixed inset-0 lg:static h-screen lg:h-full",
              {
                "max-w-64": isMenuExpanded, // Expanded state
                "w-fit -translate-x-full lg:max-w-64": !isMenuExpanded, // Collapsed state for mobile
              }
            )}
          >
            <div className="h-full border-r border-r-border-divider w-64">
              <div className="flex h-full flex-col overflow-hidden border-r-border-divider w-full">
                <div className="pl-6 pt-4 flex w-full items-center">
                  <Logo />

                  <Button
                    variant={`link-outlined`}
                    className="w-fit p-0 mr-4"
                    onClick={handleToggle}
                  >
                    <ChevronsLeft size={16} />
                  </Button>
                </div>
                <div className="p-4 w-full">
                  <Button
                    className="mb-2 gap-1 h-11 px-5 rounded-2xl hover:bg-scrim-8"
                    variant={"secondary"}
                    onClick={handleOnClick}
                  >
                    <Plus />
                    Create
                  </Button>

                  <Link
                    href={"/"}
                    className={cn(
                      "w-full flex items-center gap-4 px-4 py-3 rounded-md text-sm",
                      "transform duration-200 hover:bg-surface-elevation-2",
                      {
                        "bg-surface-elevation-2 hover:opacity-80":
                          pathname === "/",
                      }
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
    </>
  );
};

export default Sidebar;
