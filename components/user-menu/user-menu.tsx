import React, { memo, useState } from "react";
import { useUser } from "@/contexts/user-context";
import { Typography } from "../ui/typography";
import { cn, isPremiumUser } from "@/lib/utils";
import {
  ChevronDown,
  LogOut,
  Moon,
  Settings,
  Sun,
  AudioLines,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import UserSettingsModal from "../modal/user-settings-modal/user-settings-modal";
import UserAvatar from "../user-avatar/user-avatar";
import Link from "next/link";
import { Button } from "../ui/button";
import TryAIModal from "../modal/try-ai-modal/try-ai-modal";
import { useMenu } from "@/contexts/menu-context";

const UserMenu = () => {
  const { user } = useUser();
  const { isOpenPremiumModal, setIsOpenPremiumModal } = useMenu();
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

  const handleOpenTryModal = () => {
    setIsOpenPremiumModal(true);
  };

  return (
    <div className="flex flex-col justify-end pb-2 px-5">
      <div className="flex flex-col gap-3 pb-3">
        {!isPremiumUser(user!) && (
          <Button
            variant={"outline"}
            position={"left"}
            className="hover:shadow-plus-shadow rounded-full gap-1 border-border-outline"
            type="button"
            onClick={handleOpenTryModal}
          >
            <div className="flex items-center justify-center font-medium rounded-spacing-xs p-0 text-light bg-transparent">
              <AudioLines
                size={12}
                className="text-yellow-400 font-bold mr-6 mb-1 "
              />
            </div>
            Go Premium
          </Button>
        )}

        <Button
          variant={"outline"}
          position={"left"}
          className="hover:shadow-plus-shadow rounded-full gap-1 border-border-outline"
          type="button"
          onClick={handleOpenTryModal}
        >
          <AudioLines
            size={12}
            className="text-yellow-400 font-bold mr-6 mb-1"
          />
          Suggest a Persona
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "flex items-center justify-between gap-2",
              "p-1 pr-3 rounded duration-300 transition-all cursor-pointer hover:shadow-plus-shadow rounded-full gap-1 border-border-outline border border-border-outline text-primary bg-background hover:bg-surface-elevation-1"
            )}
          >
            <UserAvatar className="w-9 h-9" />
            <Typography
              variant={"small"}
              className="font-medium text-ellipsis overflow-hidden flex-1 pl-3 w-[80px] whitespace-nowrap"
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

      <TryAIModal isOpen={isOpenPremiumModal} onClose={setIsOpenPremiumModal} />

      <div
        data-orientation="horizontal"
        role="none"
        className="shrink-0 bg-border-divider h-[1px] w-full mb-1 mt-3"
      />

      <div className="flex justify-center items-center w-full text-xs text-muted-foreground pt-3 pb-3">
        <Link
          target="_blank"
          className="flex items-center hover:text-foreground"
          href="/privacy"
        >
          Privacy Policy
        </Link>
        <span className="text-muted-foreground px-2">•</span>
        <Link
          target="_blank"
          className="flex items-center hover:text-foreground"
          href="/tos"
        >
          Terms of Service
        </Link>
      </div>
    </div>
  );
};

export default memo(UserMenu);
