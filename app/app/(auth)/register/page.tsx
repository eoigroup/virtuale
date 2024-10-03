"use client";

import TextField from "@/components/text-field/text-field";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";

const RegisterPage = () => {
  const { setTheme, theme } = useTheme();
  const handleChangeMode = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Button
        variant={`link`}
        onClick={handleChangeMode}
        className="fixed top-5 right-5"
      >
        {theme === "dark" ? <Sun /> : <Moon />}
      </Button>

      <div className="max-w-[500px] overflow-hidden bg-muted rounded-md w-full mx-auto flex-col gap-4 flex p-10">
        <Typography
          variant={"h2"}
          className="p-10 pb-5 -mx-10 -mt-10 mb-10 bg-primary text-white"
        >
          Register
        </Typography>

        <TextField
          label="Email"
          type="email"
          name="email"
          labelClassName="text-primary"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          labelClassName="text-primary"
        />
        <Button>Sign Up</Button>
        <Typography variant={"small"} className="text-center">
          {`Have an account? `}
          <Link href={`/login`} className="text-primary hover:underline">
            Sign In
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default RegisterPage;
