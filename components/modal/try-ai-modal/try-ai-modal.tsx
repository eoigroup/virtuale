import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface TryAIModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

const TryAIModal: React.FC<TryAIModalProps> = ({ isOpen, onClose }) => {
  const handleClose = (open: boolean) => {
    onClose(open);
  };

  const handleOnCancel = () => {
    handleClose(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="gap-0" aria-describedby="">
        <DialogHeader>
          <DialogTitle>{`Try`}</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div></div>

          <DialogFooter className="space-x-2 mt-6">
            <Button variant={"outline"} onClick={handleOnCancel}>
              Cancel
            </Button>
            <Button>Okay</Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TryAIModal;
