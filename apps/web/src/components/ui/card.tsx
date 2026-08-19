import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "raised" | "sunken";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "bg-surface border border-rule shadow-soft",
      raised: "bg-surface border border-rule shadow-medium",
      sunken: "bg-canvas-warm border border-rule-light",
    };

    return (
      <div
        ref={ref}
        className={cn("rounded-xl p-6 transition-all", variants[variant], className)}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
