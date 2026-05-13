"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  children
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={`mx-auto max-w-3xl ${align === "center" ? "text-center" : "text-left"}`}
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-mint-700">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-graphite-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-base leading-7 text-graphite-500 sm:text-lg">
        {description}
      </p>
      {children}
    </motion.div>
  );
}
