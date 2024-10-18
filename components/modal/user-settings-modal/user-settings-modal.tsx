import React, { ReactNode } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import ProfileSetting from "@/components/profile-setting/profile-setting";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Preferences from "@/components/preferences/preferences";
import SecuritySettings from "@/components/profile-setting/security-settings";
import LanguageSettings from "@/components/profile-setting/language-settings";
import Version from "@/components/profile-setting/version";

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

const CustomTabTrigger = ({
  children,
  value,
}: {
  children: ReactNode;
  value: string;
}) => {
  return (
    <TabsTrigger
      value={value}
      className="rounded-xl w-full md:justify-start data-[state=active]:bg-surface-elevation-3"
    >
      {children}
    </TabsTrigger>
  );
};

const UserSettingsModal: React.FC<UserSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const handleClose = (open: boolean) => {
    onClose(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="gap-5 min-h-full md:min-h-[624px] md:min-w-[708px] bg-popover"
        aria-describedby=""
      >
        <DialogTitle className="hidden" />
        <Tabs defaultValue="profile" className="flex flex-col md:flex-row w-full overflow-hidden">
          <TabsList
            className={cn(
              "overflow-auto",
              "overflow-y-hidden",
              "w-full",
              "bg-transparent",
              "md:flex-col justify-start rounded-none",
              "border-b md:border-b-0 md:border-r border-border-outline",
              "md:min-h-16 md:h-full",
              "md:min-w-[180px] md:max-w-fit",
              "gap-2",
              "p-5 min-h-20 pb-2 md:pb-5 md:pt-8 items-end md:items-center"
            )}
          >
            <CustomTabTrigger value="profile">Profile</CustomTabTrigger>
            <CustomTabTrigger value="security">Security</CustomTabTrigger>
            <CustomTabTrigger value="language">Language</CustomTabTrigger>
            <CustomTabTrigger value="preferences">Preferences</CustomTabTrigger>
            <CustomTabTrigger value="version">Version</CustomTabTrigger>
          </TabsList>

          <div className="w-full h-full flex-auto px-5 pb-4 pt-0 md:pt-8 flex flex-col mt-4 md:mt-0 items-center">
            <TabsContent value="profile" className="w-full h-full">
              <ProfileSetting />
            </TabsContent>
            <TabsContent value="preferences" className="w-full h-full">
              <Preferences />
            </TabsContent>
            <TabsContent value="security" className="w-full h-full">
              <SecuritySettings />
            </TabsContent>
            <TabsContent value="language" className="w-full h-full">
              <LanguageSettings />
            </TabsContent>
            <TabsContent value="version" className="w-full h-full">
              <Version />
            </TabsContent>
          </div>
        </Tabs>
        <Button
          variant={"link-outlined"}
          className="absolute right-1 top-1"
          onClick={() => handleClose(false)}
        >
          <X size={16} />
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettingsModal;
