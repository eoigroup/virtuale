"use client";

import TextField from "@/components/text-field/text-field";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn, signInWithGoogle } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { replaceQuotes } from "@/lib/utils";
import ForgotPasswordModal from "@/components/modal/forgot-password-modal/forgot-password-modal";
import LandingHeader from "@/components/landing-header/landing-header";

type IFormInput = {
  email: string;
  password: string;
};

const schema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { register, getValues, handleSubmit } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });
  const [googleAuthLoading, setGoogleAuthLoading] = useState(false);
  const [isOpenResetPasswordModal, setIsOpenResetPasswordModal] =
    useState(false);
  const values = getValues();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      await signIn(data);
      router.push("/");
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const performGAuth = async () => {
    try {
      setGoogleAuthLoading(true);
      const link = await signInWithGoogle();
      window.open(replaceQuotes(link), "_blank");
    } catch (error) {
    } finally {
      setGoogleAuthLoading(false);
    }
  };

  return (
    <>
      <LandingHeader />

      <main className="flex items-center justify-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="max-w-[500px] overflow-hidden bg-surface-elevation-1 rounded-md w-full mx-auto flex-col gap-4 flex p-10">
            <TextField
              label="Email"
              type="email"
              labelClassName="text-primary"
              {...register("email")}
            />
            <TextField
              label="Password"
              type="password"
              labelClassName="text-primary"
              {...register("password")}
            />

            <div className="flex relative w-full items-center justify-end">
              <Typography
                variant={"xsmall"}
                as={"div"}
                className="hover:text-muted-foreground cursor-pointer"
                onClick={() => setIsOpenResetPasswordModal(true)}
              >
                Forgot Password?
              </Typography>
            </div>

            <Button loading={loading} disabled={loading} type="submit">
              Sign In
            </Button>

            <Typography
              variant={"body"}
              className="flex relative w-full items-center justify-center gap-4 text-muted-foreground font-thin"
            >
              OR
            </Typography>

            <Button
              variant={"secondary"}
              loading={googleAuthLoading}
              disabled={googleAuthLoading}
              type="submit"
              className="gap-6"
              onClick={performGAuth}
            >
              <svg width="24" height="1.5em" viewBox="0 0 24 25">
                <path
                  d="M21.8055 11.0076H21V10.9661H12V14.9661H17.6515C16.827 17.2946 14.6115 18.9661 12 18.9661C8.6865 18.9661 6 16.2796 6 12.9661C6 9.65256 8.6865 6.96606 12 6.96606C13.5295 6.96606 14.921 7.54306 15.9805 8.48556L18.809 5.65706C17.023 3.99256 14.634 2.96606 12 2.96606C6.4775 2.96606 2 7.44356 2 12.9661C2 18.4886 6.4775 22.9661 12 22.9661C17.5225 22.9661 22 18.4886 22 12.9661C22 12.2956 21.931 11.6411 21.8055 11.0076Z"
                  fill="#FFC107"
                ></path>
                <path
                  d="M3.15234 8.31156L6.43784 10.7211C7.32684 8.52006 9.47984 6.96606 11.9993 6.96606C13.5288 6.96606 14.9203 7.54306 15.9798 8.48556L18.8083 5.65706C17.0223 3.99256 14.6333 2.96606 11.9993 2.96606C8.15834 2.96606 4.82734 5.13456 3.15234 8.31156Z"
                  fill="#FF3D00"
                ></path>
                <path
                  d="M12.0002 22.9664C14.5832 22.9664 16.9302 21.9779 18.7047 20.3704L15.6097 17.7514C14.5719 18.5406 13.3039 18.9674 12.0002 18.9664C9.39916 18.9664 7.19066 17.3079 6.35866 14.9934L3.09766 17.5059C4.75266 20.7444 8.11366 22.9664 12.0002 22.9664Z"
                  fill="#4CAF50"
                ></path>
                <path
                  d="M21.8055 11.0076H21V10.9661H12V14.9661H17.6515C17.2571 16.0743 16.5467 17.0427 15.608 17.7516L15.6095 17.7506L18.7045 20.3696C18.4855 20.5686 22 17.9661 22 12.9661C22 12.2956 21.931 11.6411 21.8055 11.0076Z"
                  fill="#1976D2"
                ></path>
              </svg>
              Continue with Google
            </Button>

            <Typography variant={"small"} className="text-center">
              {`Don't have an account? `}
              <Link href={`/register`} className="text-primary hover:underline">
                Sign Up
              </Link>
            </Typography>
          </div>
        </form>

        <ForgotPasswordModal
          isOpen={isOpenResetPasswordModal}
          onClose={() => setIsOpenResetPasswordModal(false)}
          email={values.email}
        />
      </main>
    </>
  );
};

export default LoginPage;
