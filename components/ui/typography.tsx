import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Define a type for all possible variants
type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle"
  | "body"
  | "smallText"
  | "caption"
  | "overline"
  | "blockquote"
  | "lead"
  | "large"
  | "small";

// Define a mapping from variant to HTML elements
const variantToElement: Record<TypographyVariant, keyof JSX.IntrinsicElements> =
  {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    subtitle: "h6", // Default semantic element for subtitles
    body: "p",
    smallText: "span",
    caption: "span",
    overline: "span",
    blockquote: "blockquote",
    lead: "p",
    large: "p",
    small: "small",
  };

// Use cva to define the typography styles
const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-4xl font-bold",
      h2: "text-3xl font-semibold",
      h3: "text-2xl font-medium",
      h4: "text-xl font-medium",
      h5: "text-lg font-medium",
      h6: "text-base font-medium",
      subtitle: "text-lg",
      body: "text-base",
      small: "text-sm",
      caption: "text-xs text-gray-500",
      overline: "text-xs uppercase tracking-widest text-gray-500",
      blockquote: "text-lg italic border-l-4 pl-4 border-gray-300",
      lead: "text-xl font-light text-gray-700",
      large: "text-2xl",
      "extra-small": "text-xs",
    },
  },
  defaultVariants: {
    variant: "body", // Default variant
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  asChild?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "body", as, asChild = false, ...props }, ref) => {
    // Ensure TypeScript knows that variant will always be one of the keys in variantToElement
    const Component = as ?? variantToElement[variant as TypographyVariant];

    return (
      <Component
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = "Typography";

export { Typography, typographyVariants };
