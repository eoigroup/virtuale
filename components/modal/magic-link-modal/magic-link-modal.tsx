"use client";
 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@/components/text-field/text-field";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";
import { sendMagicLink } from "@/lib/api/auth";

interface MagicLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

const schema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

type FormValues = {
  email: string;
};

export default function MagicLinkModal({ isOpen, onClose, defaultEmail = "" }: MagicLinkModalProps) {
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: defaultEmail || ""
    }
  });

  const onSubmit = async (values: FormValues) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("client_host", "virtualera.ai");
      
      const data = await sendMagicLink(formData);
      
      if (data.message === "Magic link sent successfully") {
        toast.success("Magic link sent! Please check your email");
        onClose();
      } else {
        throw new Error(data.error || "Failed to send magic link");
      }
    } catch (error: any) {
      console.error('Magic link error:', error);
      toast.error(error.message || "Failed to send magic link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login with Magic Link</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <TextField
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email}
            disabled={loading}
            autoFocus
          />
          
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Mail className="h-4 w-4" />
              )}
              Send Magic Link
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 