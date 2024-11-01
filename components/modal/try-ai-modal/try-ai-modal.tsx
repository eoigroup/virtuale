import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getAvailableSubscriptions } from "@/lib/api/subscription";

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

  const getSubscriptions = async () => {
    try {
      const response = await getAvailableSubscriptions();
      console.log("response", response);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getSubscriptions();
  }, []);
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
