import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TextField from "@/components/text-field/text-field";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/api/auth";

interface FormValues {
  otp: string;
}

interface EmailVerifyModalProps {
  email: string;
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

// Define Zod validation schema
const validationSchema = z.object({
  otp: z.string().min(6, { message: "Invalid Code" }),
});

const EmailVerifyModal: React.FC<EmailVerifyModalProps> = ({
  email,
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm<FormValues>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(validationSchema),
  });
  const { errors } = formState;
  const router = useRouter();

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    console.log("data", data);
    onSubmit(data);
  };

  const handleClose = (open: boolean) => {
    reset();
    onClose(open);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await verifyEmail({
        email: email,
        otp: data.otp,
      });
      toast.success("Account created successfully. Please login.");
      setLoading(false);
      reset();
      router.push("/login");
    } catch (error: any) {
      toast.error(error?.message || "Error verifying email");
    }
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="gap-5" aria-describedby="">
        <DialogHeader>
          <DialogTitle>{`Email Verification`}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(submitHandler)} className="p-6">
          <div className="space-y-2">
            <TextField label="Code" {...register("otp")} error={errors.otp} />
          </div>

          <DialogFooter className="space-x-2 mt-6">
            <Button
              loading={loading}
              type="submit"
              disabled={loading || !formState.isDirty || !formState.isValid}
            >
              Verify
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailVerifyModal;
