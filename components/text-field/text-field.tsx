'use client'

import React, { forwardRef, useState } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Typography } from "../ui/typography";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  labelClassName?: string;
  error?: FieldError;
}

const TextField: React.FC<TextFieldProps> = forwardRef(
  (
    { label, type, name, labelClassName, error, ...inputProps },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setPasswordVisible(!isPasswordVisible);
    };

    return (
      <div>
        <Label
          htmlFor={name}
          className={cn("block", labelClassName, { "text-destructive": error })}
        >
          {label}
        </Label>
        <div className="relative">
          <Input
            ref={ref}
            type={type === "password" && isPasswordVisible ? "text" : type}
            id={name}
            name={name}
            className={cn("mt-2", {
              "border-destructive": error,
            })}
            {...inputProps}
          />
          {type === "password" && (
            <Button
              type="button"
              onClick={togglePasswordVisibility}
              variant={"link-outlined"}
              className="absolute right-3 top-0 p-0"
            >
              {isPasswordVisible ? <Eye size={16} /> : <EyeOff size={16} />}
            </Button>
          )}
        </div>
        {error && (
          <Typography
            variant={"extra-small"}
            className="text-destructive mt-1 text-xs"
            as={"p"}
          >
            {error.message}
          </Typography>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;
