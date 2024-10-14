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
  createNewPassword,
  sendResetPasswordCode,
  verifyResetPasswordCode,
} from "@/lib/api/auth";

interface FormValues {
  email: string;
}

interface OTPFormValues {
  otp: string;
}

interface PasswordFormValues {
  password: string;
}

interface ForgotPasswordModalProps {
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
  CREATE = 2,
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  email,
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const { register, trigger, handleSubmit, getValues, reset, formState } =
    useForm<FormValues>({
      defaultValues: {
        email: email || "",
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
  const {
    handleSubmit: handlePasswordSubmit,
    register: registerPassword,
    formState: passwordFormState,
    reset: resetPasswordForm,
  } = useForm<PasswordFormValues>({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(passwordValidationSchema),
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
      await sendResetPasswordCode({
        email: data.email,
      });
      toast.success(
        "Password reset code has been sent to your email successfully."
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
      await verifyResetPasswordCode({
        email: values.email,
        otp: data.otp,
      });
      toast.success("Your code is valid.");
      setLoading(false);
      setStep(STEPS.CREATE);
      resetOTPForm();
    } catch (error: any) {
      toast.error(error?.message || "Failed to send the code");
    }
    setLoading(false);
  };

  const handleCreateNewPassword: SubmitHandler<PasswordFormValues> = async (
    data
  ) => {
    setLoading(true);
    try {
      await createNewPassword({
        email: values.email,
        password: data.password,
      });
      toast.success("Successfully created a new password. Please login now.");
      setLoading(false);
      setStep(STEPS.EMAIL);
      resetPasswordForm();
      reset();
      handleClose(false);
    } catch (error: any) {
      toast.error(error?.message || "Failed to send the code");
    }
    setLoading(false);
  };

  const getTitle = () => {
    switch (step) {
      case STEPS.EMAIL:
        return "Forgot Password";
      case STEPS.VERIFY:
        return "Verify Code";
      case STEPS.CREATE:
        return "Create New Password";
      default:
        return "Forgot Password";
    }
  };

  useEffect(() => {
    if (!email) return;

    reset({
      email: email,
    });
  }, [email, trigger, reset]);

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
              : step === STEPS.VERIFY
              ? handleOTPSubmit(handleVerifyCode)
              : handlePasswordSubmit(handleCreateNewPassword)
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

            {step === STEPS.CREATE && (
              <TextField
                label="New Password"
                {...registerPassword("password")}
                error={passwordFormState.errors.password}
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
                Send a Request
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

            {step === STEPS.CREATE && (
              <Button
                loading={loading}
                type="submit"
                disabled={loading || !passwordFormState.isValid}
              >
                Confirm
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPasswordModal;
