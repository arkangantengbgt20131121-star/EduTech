"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all duration-200 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/45 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_24px_-12px_var(--primary)] hover:brightness-110",
        gradient:
          "bg-[linear-gradient(100deg,var(--brand-indigo),var(--brand-violet)_55%,var(--brand-cyan))] bg-[length:180%_180%] text-white shadow-[0_12px_30px_-12px_var(--brand-violet)] hover:bg-[position:100%_50%]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/75 border border-border/60",
        outline:
          "border border-border bg-card/60 hover:bg-muted hover:text-foreground backdrop-blur",
        ghost: "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:brightness-110",
        success: "bg-success text-success-foreground hover:brightness-110",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3.5",
        sm: "h-8.5 gap-1.5 rounded-lg px-3 text-[13px] has-[>svg]:px-2.5",
        lg: "h-12 rounded-2xl px-6 text-[15px] has-[>svg]:px-5",
        xl: "h-13 rounded-2xl px-7 text-base has-[>svg]:px-6",
        icon: "size-10",
        "icon-sm": "size-8.5 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
