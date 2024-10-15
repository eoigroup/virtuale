import React, { forwardRef } from "react";
import {
  Select as BaseSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { FieldError } from "react-hook-form";
import { Typography } from "../ui/typography";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  label?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  width?: string; // Optional custom width for the select trigger
  name: string;
  error?: FieldError;
  itemClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = forwardRef(
  (
    {
      options,
      error,
      name,
      className = "",
      itemClassName = "",
      triggerClassName = "",
      labelClassName = "",
      label,
      placeholder,
      value,
      onChange,
    },
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <div className={className}>
        {label && (
          <Label
            htmlFor={name}
            className={cn(
              "block",
              { "text-destructive": error },
              labelClassName
            )}
          >
            {label}
          </Label>
        )}
        <BaseSelect value={value} onValueChange={onChange}>
          <SelectTrigger
            ref={ref}
            className={cn(
              "mt-2",
              {
                "border-destructive text-destructive": error,
              },
              triggerClassName
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className={itemClassName}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </BaseSelect>

        {error && (
          <Typography
            variant={"xsmall"}
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
Select.displayName = "Select";

export default Select;
