import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import ProfileSetting from "@/components/profile-setting/profile-setting";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface UserSettingsModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

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
        className="gap-5 min-h-full md:min-h-[624px] md:min-w-[708px]"
        aria-describedby=""
      >
        <DialogTitle className="hidden" />
        <Tabs defaultValue="profile" className="flex flex-col md:flex-row">
          <TabsList
            className={cn(
              "bg-transparent",
              "md:flex-col justify-start rounded-none p-5 md:pt-8",
              "border-b md:border-b-0 md:border-r border-border-outline",
              "min-h-16 md:h-full",
              "md:min-w-[180px] md:max-w-fit",
              "gap-2"
            )}
          >
            <TabsTrigger value="profile" className="w-full md:justify-start">
              Profile
            </TabsTrigger>
            {/* <TabsTrigger value="account" className="w-full md:justify-start">
              Account
            </TabsTrigger>
            <TabsTrigger value="preferences" className="w-full md:justify-start">
              Preferences
            </TabsTrigger> */}
          </TabsList>

          <div className="w-full h-full flex-auto px-5 pb-4 pt-0 md:pt-8 flex flex-col mt-4 md:mt-0 items-center">
            <TabsContent value="profile" className="w-full h-full">
              <ProfileSetting />
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