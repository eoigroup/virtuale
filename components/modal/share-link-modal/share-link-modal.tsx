import React, { memo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

interface ShareLinkModalProps {
  personaId: string;
  isOpen: boolean;
  personaName: string;
  onClose: (open: boolean) => void;
}

const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
  personaId,
  personaName,
  isOpen,
  onClose,
}) => {
  const shareUrl = `${window.location.origin}/persona/${personaId}`;

  const handleClose = (open: boolean) => {
    onClose(open);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied");
  };

  const shareOnPlatform = (platform: string) => {
    const shareUrl = `${window.location.origin}/persona/${personaId}`;
    const text = encodeURIComponent(`Check out this persona: ${personaName}`);

    let shareLink = "";
    switch (platform) {
      case "x":
        shareLink = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`;
        break;
      case "whatsapp":
        shareLink = `https://wa.me/?text=${text}%20${shareUrl}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
        break;
      default:
        return;
    }
    const newWindow = window.open(shareLink, "_blank");
    console.log("window", window);
    console.log("newWindow", newWindow);
    if (
      !newWindow ||
      newWindow.closed ||
      typeof newWindow.closed === "undefined"
    ) {
      // Fallback for iOS if popup is blocked
      window.location.href = shareLink;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="gap-0" aria-describedby="">
        <DialogHeader>
          <DialogTitle className="text-center">{`Share`}</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="flex items-center justify-center gap-10 mb-10">
            <Button
              variant="link-outlined"
              className="p-0 h-auto"
              onClick={() => shareOnPlatform("x")}
            >
              <Image
                width={0}
                height={0}
                sizes={"100vw"}
                src="https://cdn-icons-png.flaticon.com/512/3670/3670151.png"
                alt="Share on X"
                className="h-10 w-10"
              />
            </Button>
            <Button
              variant="link-outlined"
              className="p-0 h-auto"
              onClick={() => shareOnPlatform("whatsapp")}
            >
              <Image
                width={0}
                height={0}
                sizes={"100vw"}
                src="https://cdn-icons-png.flaticon.com/512/3670/3670051.png"
                alt="Share on WhatsApp"
                className="h-10 w-10"
              />
            </Button>
            <Button
              variant="link-outlined"
              className="p-0 h-auto"
              onClick={() => shareOnPlatform("facebook")}
            >
              <Image
                width={0}
                height={0}
                sizes={"100vw"}
                src="https://cdn-icons-png.flaticon.com/512/5968/5968764.png"
                alt="Share on Facebook"
                className="h-10 w-10"
              />
            </Button>
          </div>

          <div className="flex items-center">
            <Input value={shareUrl} readOnly className="pr-12" />
            <Button
              variant={"link-outlined"}
              className="p-0 h-auto -translate-x-full right-2 relative"
              onClick={handleShareLink}
            >
              <Copy />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default memo(ShareLinkModal);
