"use client";

import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: boolean;
};

const variants = {
  primary:
    "bg-graphite-900 text-white shadow-soft hover:-translate-y-0.5 hover:bg-graphite-700",
  secondary:
    "border border-graphite-900/10 bg-white/80 text-graphite-900 shadow-card hover:-translate-y-0.5 hover:border-mint-500/35",
  ghost: "text-graphite-700 hover:bg-white/70 hover:text-graphite-900"
};

export function Button({
  children,
  variant = "primary",
  icon,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
      {...props}
    >
      {children}
      {icon ? <ArrowRight aria-hidden="true" size={16} /> : null}
    </button>
  );
}
