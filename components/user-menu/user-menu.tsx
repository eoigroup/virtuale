import React, { useState } from "react";
import { useUser } from "@/contexts/user-context";
import { Typography } from "../ui/typography";
import { cn } from "@/lib/utils";
import { ChevronDown, LogOut, Moon, Settings, Sun } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import UserSettingsModal from "../modal/user-settings-modal/user-settings-modal";

const UserMenu = () => {
  const { user } = useUser();
  const { setTheme, theme } = useTheme();
  const router = useRouter();
  const [isOpenSettingsModal, setIsOpenSettingsModal] =
    useState<boolean>(false);
  const handleChangeMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = async () => {
    router.push("/logout");
  };

  const getAvatarName = () => {
    if (user?.username) {
      return user.username.charAt(0).toUpperCase();
    }

    return user?.email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex flex-col justify-end pb-2 px-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "flex items-center justify-between gap-2",
              "p-3 px-2 rounded duration-300 transition-all cursor-pointer"
            )}
          >
            <picture className="flex items-center justify-center min-w-9 w-9 h-9 rounded-full font-bold character-gradient-v">
              {user?.profile_picture ? (
                <Image
                  src={user.profile_picture}
                  width={0}
                  height={0}
                  alt=""
                  className="w-full h-full"
                  sizes="100vw"
                />
              ) : (
                <Typography variant={"xsmall"}>{getAvatarName()}</Typography>
              )}
            </picture>

            <Typography
              variant={"xsmall"}
              className="text-ellipsis overflow-hidden flex-1 w-[80px] whitespace-nowrap"
              title={user?.username}
            >
              {user?.username}
            </Typography>
            <ChevronDown size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mr-2" sideOffset={0}>
          <DropdownMenuItem
            className="flex justify-between cursor-pointer gap-2"
            onClick={handleChangeMode}
          >
            {theme === "light" ? "Dark" : "Light"}
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between cursor-pointer gap-2"
            onClick={() => setIsOpenSettingsModal(true)}
          >
            Settings <Settings size={16} />
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex justify-between cursor-pointer gap-2"
            onClick={handleLogout}
          >
            Log out <LogOut size={16} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UserSettingsModal
        isOpen={isOpenSettingsModal}
        onClose={setIsOpenSettingsModal}
      />
    </div>
  );
};

export default UserMenu;
