import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { convertBlobToBase64 } from "@/lib/utils";

interface EmailVerifyModalProps {
  selectedFile: File | null;
  isOpen: boolean;
  onClose: (open: boolean) => void;
  onSend: () => void;
}

const ImagePreviewModal: React.FC<EmailVerifyModalProps> = ({
  selectedFile,
  isOpen,
  onClose,
  onSend,
}) => {
  const [image, setImage] = useState<string>("");

  const getImage = async () => {
    if (!selectedFile) return "";

    const img = await convertBlobToBase64(selectedFile, true);
    setImage(img);
  };

  const handleClose = (open: boolean) => {
    onClose(open);
    setTimeout(() => {
      setImage("");
    }, 300);
  };

  const handleOnCancel = () => {
    handleClose(false);
  };

  useEffect(() => {
    if (!selectedFile) return;
    getImage();
  }, [selectedFile]);

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="gap-0" aria-describedby="">
        <DialogHeader>
          <DialogTitle>{`Send an Image`}</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div>
            {image && (
              <Image
                src={image}
                alt=""
                width={0}
                height={0}
                priority
                sizes="100vw"
                className="w-full h-auto"
              />
            )}
          </div>

          <DialogFooter className="space-x-2 mt-6">
            <Button variant={"outline"} onClick={handleOnCancel}>
              Cancel
            </Button>
            <Button onClick={onSend}>Send</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewModal;
