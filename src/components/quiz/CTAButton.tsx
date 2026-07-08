import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
}

export function CTAButton({
  children,
  variant = "primary",
  fullWidth = true,
  className = "",
  ...rest
}: CTAButtonProps) {
  const base =
    variant === "primary"
      ? "cta-primary hover:brightness-105 active:brightness-95"
      : "bg-transparent text-foreground border border-border hover:bg-muted";
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${base} inline-flex h-14 items-center justify-center rounded-full px-8 text-base disabled:cursor-not-allowed disabled:opacity-40 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...(rest as object)}
    >
      {children}
    </motion.button>
  );
}
