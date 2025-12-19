"use client";

import {
  ButtonHTMLAttributes,
  ReactElement,
  cloneElement,
  forwardRef,
  isValidElement
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  children: React.ReactNode;
};

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-soft hover:bg-primary-dark hover:shadow-lg focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
  secondary:
    "bg-gold text-ink shadow-card hover:brightness-105 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold",
  ghost:
    "bg-white/70 text-primary-dark border border-primary/20 backdrop-blur-md hover:bg-white focus-visible:ring-2 focus-visible:ring-primary",
  outline:
    "border border-ink/15 text-ink hover:border-primary hover:text-primary focus-visible:ring-2 focus-visible:ring-primary"
};

const sizeStyles: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-base",
  lg: "px-6 py-3 text-base md:text-lg"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", asChild = false, children, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center gap-2 rounded-pill font-semibold transition-all duration-200 focus:outline-none",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement, {
        className: cn(classes, (children as ReactElement).props.className)
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
