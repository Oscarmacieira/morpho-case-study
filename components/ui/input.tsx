import * as React from "react";

import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

export const inputVariants = cva(
  "flex items-center w-full text-sm bg-transparent file:border-0 file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-within:outline-none aria-invalid:ring-1 aria-invalid:ring-destructive aria-invalid:focus-within:ring-2 aria-invalid:focus-within:ring-destructive",

  {
    variants: {
      rounded: {
        none: "rounded-none",
        md: "rounded-md",
      },
      variant: {
        outline:
          "h-10 px-3 py-2 border border-border focus-within:border-primary focus-within:shadow-[0_0px_0px_1px_hsl(var(--primary))] aria-invalid:border-transparent",
        filled:
          "h-[38px] px-[10px] py-2 gap-[10px] bg-[hsla(206,12%,11%,0.03)] border border-[hsla(0,0%,0%,0)] focus-within:border-[hsla(212,82%,60%,1)]",
        underlined:
          "h-10 px-3 py-2 rounded-none border-b-border focus-within:border-b-primary focus-within:shadow-[0_1px_0px_0px_hsl(var(--primary))]",
        unstyled: "",
      },
    },
    defaultVariants: {
      rounded: "md",
      variant: "outline",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, rounded, variant, startContent, endContent, ...props },
    ref
  ) => {
    return (
      <div
        className={cn(
          inputVariants({ variant, rounded, className }),
          className
        )}
      >
        {startContent && (
          <span className="pointer-events-none flex items-center text-muted-foreground">
            {startContent}
          </span>
        )}
        <input
          ref={ref}
          {...props}
          className={cn(
            "w-full bg-transparent outline-none focus-visible:outline-none",
            {
              "pl-1.5": !!startContent,
              "pr-1.5": !!endContent,
            }
          )}
        />
        {endContent && (
          <span className="pointer-events-none flex items-center text-muted-foreground">
            {endContent}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
