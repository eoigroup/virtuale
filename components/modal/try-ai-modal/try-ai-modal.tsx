import React, { useEffect, useState } from "react";
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

interface Subscription {
  sub_id: string;
  price: number;
  currency: string;
  interval: string;
}

interface TryAIModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

const TryAIModal: React.FC<TryAIModalProps> = ({ isOpen, onClose }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  const handleClose = (open: boolean) => {
    onClose(open);
  };

  const handleOnCancel = () => {
    handleClose(false);
  };

  const getSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await getAvailableSubscriptions();
      console.log("Subscriptions response:", response);
      if (response.data?.subs) {
        setSubscriptions(response.data.subs);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getSubscriptions();
    }
  }, [isOpen]);

  const handleSubscribe = async (subId: string) => {
    try {
      setSubscribing(true);
      const response = await fetch("/api/pay/subscriptions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sub_id: subId,
          action: "subscribe"
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received");
      }

    } catch (error: any) {
      toast.error(error.message || "Failed to create subscription");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="gap-0" aria-describedby="">
        <DialogHeader>
          <DialogTitle>Choose a Subscription Plan</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          {loading ? (
            <div className="text-center">Loading subscriptions...</div>
          ) : (
            <div className="grid gap-4">
              {subscriptions.map((sub) => (
                <div
                  key={sub.sub_id}
                  className="p-4 border rounded-lg hover:border-primary transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">
                        {sub.price} {sub.currency.toUpperCase()}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        per {sub.interval}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => handleSubscribe(sub.sub_id)}
                      disabled={subscribing}
                    >
                      {subscribing ? "Processing..." : "Select"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <DialogFooter className="space-x-2 mt-6">
            <Button variant="outline" onClick={handleOnCancel}>
              Cancel
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TryAIModal;
