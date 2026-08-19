import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-semibold transition-all cursor-pointer active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-accent-500 text-white hover:bg-accent-600 hover:shadow-medium",
      secondary:
        "bg-surface border border-rule text-ink hover:bg-canvas-warm hover:border-rule-dark",
      ghost: "text-ink-muted hover:bg-canvas-warm hover:text-ink",
      danger: "bg-danger text-white hover:bg-danger-light",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded-md",
      md: "text-sm px-4 py-2.5 rounded-lg",
      lg: "text-base px-6 py-3 rounded-lg",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
