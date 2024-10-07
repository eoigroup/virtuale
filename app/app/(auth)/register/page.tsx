"use client";

import EmailVerifyModal from "@/components/modal/email-verify-modal/email-verify-modal";
import TextField from "@/components/text-field/text-field";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { signUp } from "@/lib/api/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
const ThemeModeButton = dynamic(
  () => import("@/components/theme-mode-button/theme-mode-button"),
  { ssr: false }
);

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type IFormInput = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage = () => {
  const { register, handleSubmit, getValues } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenVerifyModal, setIsOpenVerifyModal] = useState<boolean>(false);
  const values = getValues();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      await signUp(data);
      setIsOpenVerifyModal(true);
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ThemeModeButton className="fixed top-5 right-5" />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="max-w-[500px] shadow-lg overflow-hidden bg-surface-elevation-1 rounded-md w-full mx-auto flex-col gap-4 flex p-10">
          <TextField
            label="Name"
            labelClassName="text-primary"
            {...register("name")}
          />
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

          <Button loading={loading} disabled={loading} type="submit">
            Sign Up
          </Button>

          <Typography variant={"small"} className="text-center">
            {`Have an account? `}
            <Link href={`/login`} className="text-primary hover:underline">
              Sign In
            </Link>
          </Typography>
        </div>
      </form>

      <EmailVerifyModal
        email={values.email}
        isOpen={isOpenVerifyModal}
        onClose={setIsOpenVerifyModal}
      />
    </div>
  );
};

export default RegisterPage;
