"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  const scrollToBooking = () => {
    document.getElementById("rezerwacja")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-graphite-900 p-8 text-white shadow-soft sm:p-12 lg:p-16"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint-300">
              Rehavo
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              System rezerwacji, który wygląda jak przewaga konkurencyjna
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
              Premium doświadczenie dla pacjentów i praktyczny panel dla małego
              biznesu usługowego, który chce obsługiwać rezerwacje szybciej i spokojniej.
            </p>
          </div>
          <Button
            className="bg-white text-graphite-900 hover:bg-mint-50"
            onClick={scrollToBooking}
            icon
          >
            Przetestuj rezerwację
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
