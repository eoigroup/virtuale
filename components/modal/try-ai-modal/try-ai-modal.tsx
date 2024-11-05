import React, { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getAvailableSubscriptions } from "@/lib/api/subscription";
import { Typography } from "@/components/ui/typography";
import { Zap, MessageCircle, Rocket, Crown } from "lucide-react";

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

const SUBSCRIPTION_FEATURES = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Turbo Messages",
    description: "Lightning-fast response times"
  },
  {
    icon: <MessageCircle className="w-8 h-8" />,
    title: "Unlimited Chat",
    description: "Chat without restrictions"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Premium Features",
    description: "Access to advanced capabilities"
  },
  {
    icon: <Crown className="w-8 h-8" />,
    title: "Priority Support",
    description: "24/7 premium support access"
  }
];

const TryAIModal: React.FC<TryAIModalProps> = ({ isOpen, onClose }) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getSubscriptions();
    }
  }, [isOpen]);

  const getSubscriptions = async () => {
    try {
      setLoading(true);
      const response = await getAvailableSubscriptions();
      if (response.data?.subs) {
        setSubscriptions(response.data.subs);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (subId: string) => {
    try {
      setSubscribing(true);
      const response = await fetch("/api/pay/subscriptions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sub_id: subId, action: "subscribe" }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      if (data.url) window.location.href = data.url;
      else throw new Error("No checkout URL received");
    } catch (error: any) {
      toast.error(error.message || "Failed to create subscription");
    } finally {
      setSubscribing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-3 gap-0 bg-transparent border-none shadow-none">
        <div className="relative rounded-3xl overflow-hidden">
          {/* Background Image for entire modal */}
          <div 
            className="absolute inset-0 bg-cover bg-top"
            style={{ 
              backgroundImage: "url(https://sm-voice-gen.s3.amazonaws.com/images/virtualeaiagent-themastermind.jpg)",
              opacity: 0.9,
              objectPosition: 'top',
            }}
          />

          {/* Gradient overlay for entire modal */}
          <div 
            className="absolute inset-0"
            style={{ 
              background: "linear-gradient(to bottom, rgba(28, 29, 27, 0.7) 0%, rgba(28, 29, 27, 0.95) 100%)"
            }}
          />

          {/* Content Container */}
          <div className="relative z-10">
            {/* Hero Section */}
            <div className="p-6 pt-16">
              {/* Top Label */}
              <div className="uppercase absolute top-4 left-6 z-20 text-xs bg-white text-black font-semibold px-4 py-2 rounded-full">
                PREMIUM ACCESS
              </div>

              {/* Hero Content */}
              <div className="mt-6">
                <h4 className="text-2xl font-bold text-white mb-0">Upgrade to</h4>
                <h2 className="text-4xl font-bold text-white mb-2">Premium</h2>
                <p className="text-xl text-white/90">Unlock unlimited possibilities</p>
              </div>
            </div>

            {/* Features Section */}
            <div className="p-4">
              {SUBSCRIPTION_FEATURES.map((feature, index) => (
                <div 
                  key={index}
                  className="mb-2 mx-auto w-[95%] flex gap-2 rounded-full py-1 pl-0 pr-4 bg-[#e4e4e7] dark:bg-[#26272b]"
                >
                  <div className="w-[60px] pl-2">
                    <div className="w-[50px] h-[50px] rounded-full bg-primary flex items-center justify-center text-black">
                      {feature.icon}
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-center">
                    <Typography variant="small" className="dark:text-white text-black text-lg font-semibold mb-0">
                      {feature.title}
                    </Typography>
                    <Typography variant="xsmall" className="text-gray-400">
                      {feature.description}
                    </Typography>
                  </div>

                 {/* <div className="flex items-center">
                    <Button
                      variant="outline"
                      className="whitespace-nowrap"
                    >
                      Premium
                    </Button>
                  </div>
                  */}
                </div>
              ))}

              {/* Pricing Section */}
              <div className="mt-6 mx-auto w-[95%] flex flex-col md:flex-row justify-center gap-4 rounded-lg md:rounded-full py-4 px-6 bg-[#e4e4e7] dark:bg-[#26272b]">
                {subscriptions.map((sub) => (
                  <Button
                    key={sub.sub_id}
                    variant="default"
                    onClick={() => handleSubscribe(sub.sub_id)}
                    disabled={subscribing}
                    className="min-w-[200px] text-lg font-semibold"
                  >
                    {subscribing ? (
                      "Processing..."
                    ) : (
                      <div className="text-sm">
                        Subscribe for <br /> {sub.price} {sub.currency.toUpperCase()}/{sub.interval}
                      </div>
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TryAIModal;
