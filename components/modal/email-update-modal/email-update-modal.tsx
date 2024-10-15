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
import {
  changeEmail,
  sendResetPasswordCode,
  verifyNewEmail,
  verifyResetPasswordCode,
} from "@/lib/api/auth";
import { useUser } from "@/contexts/user-context";

interface FormValues {
  email: string;
}

interface OTPFormValues {
  otp: string;
}

interface PasswordFormValues {
  password: string;
}

interface EmailUpdateModalProps {
  email?: string;
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

// Define Zod validation schema
const validationSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
});

// Define Zod validation schema
const OTPValidationSchema = z.object({
  otp: z.string().min(6, { message: "Invalid Code" }),
});

// Define Zod validation schema
const passwordValidationSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
});

enum STEPS {
  EMAIL = 0,
  VERIFY = 1,
}

const EmailUpdateModal: React.FC<EmailUpdateModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { updateSessionUser } = useUser();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, getValues, reset, formState } =
    useForm<FormValues>({
      defaultValues: {
        email: "",
      },
      resolver: zodResolver(validationSchema),
    });
  const { errors } = formState;
  const values = getValues();
  const [step, setStep] = useState<Partial<STEPS>>(STEPS.EMAIL);
  const {
    handleSubmit: handleOTPSubmit,
    register: registerOTP,
    formState: OTPFormState,
    reset: resetOTPForm,
  } = useForm<OTPFormValues>({
    defaultValues: {
      otp: "",
    },
    resolver: zodResolver(OTPValidationSchema),
  });

  const submitHandler: SubmitHandler<FormValues> = (data) => {
    onSubmit(data);
  };

  const handleClose = (open: boolean) => {
    onClose(open);
  };

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      await changeEmail({
        email: data.email,
      });
      toast.success(
        "Email confirmation code has been sent to your email successfully."
      );
      setLoading(false);
      setStep(STEPS.VERIFY);
    } catch (error: any) {
      toast.error(error?.message || "Failed to send the code");
    }
    setLoading(false);
  };

  const handleVerifyCode: SubmitHandler<OTPFormValues> = async (data) => {
    setLoading(true);
    try {
      await verifyNewEmail({
        email: values.email,
        otp: data.otp,
      });
      toast.success("Your email have changed successfully.");
      setLoading(false);
      setStep(STEPS.EMAIL);
      resetOTPForm();
      reset();
      handleClose(false);
      updateSessionUser();
    } catch (error: any) {
      toast.error(error?.message || "Failed to send the code");
    }
    setLoading(false);
  };

  const getTitle = () => {
    switch (step) {
      case STEPS.EMAIL:
        return "Update Email";
      case STEPS.VERIFY:
        return "Verify Code";
      default:
        return "Update Email";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="gap-5" aria-describedby="">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={
            step === STEPS.EMAIL
              ? handleSubmit(submitHandler)
              : handleOTPSubmit(handleVerifyCode)
          }
          className="p-6"
        >
          <div className="space-y-2">
            {step === STEPS.EMAIL && (
              <TextField
                label="Email"
                {...register("email")}
                error={errors.email}
              />
            )}

            {step === STEPS.VERIFY && (
              <TextField
                label="Code"
                {...registerOTP("otp")}
                error={OTPFormState.errors.otp}
              />
            )}
          </div>

          <DialogFooter className="space-x-2 mt-6">
            {step === STEPS.EMAIL && (
              <Button
                loading={loading}
                type="submit"
                disabled={loading || !formState.isValid}
              >
                Update
              </Button>
            )}
            {step === STEPS.VERIFY && (
              <Button
                loading={loading}
                type="submit"
                disabled={loading || !OTPFormState.isValid}
              >
                Verify
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EmailUpdateModal;
