import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface CTAButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
}

export function CTAButton({ children, fullWidth = true, className = "", ...rest }: CTAButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`cta-primary inline-flex h-[56px] items-center justify-center px-8 text-lg font-bold disabled:cursor-not-allowed disabled:opacity-40 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...(rest as object)}
    >
      {children}
    </motion.button>
  );
}
