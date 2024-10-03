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
import { signIn } from "@/lib/api/auth";
import dynamic from "next/dynamic";
const ThemeModeButton = dynamic(
  () => import("@/components/theme-mode-button/theme-mode-button"),
  { ssr: false }
);

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
  const { register, handleSubmit } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setLoading(true);
    try {
      await signIn(data);
    } catch (error: any) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <ThemeModeButton className="fixed top-5 right-5" />

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="max-w-[500px] overflow-hidden bg-muted rounded-md w-full mx-auto flex-col gap-4 flex p-10">
          <Typography
            variant={"h2"}
            className="p-10 pb-5 -mx-10 -mt-10 mb-10 bg-primary text-white"
          >
            Login
          </Typography>
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
            Sign In
          </Button>
          <Typography variant={"small"} className="text-center">
            {`Don't have an account? `}
            <Link href={`/register`} className="text-primary hover:underline">
              Sign Up
            </Link>
          </Typography>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
