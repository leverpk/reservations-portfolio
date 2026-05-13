"use client";

import { motion } from "framer-motion";
import { CalendarCheck, ClipboardCheck, MousePointer2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    title: "Wybierz usługę",
    description: "Klient widzi zakres, czas trwania i cenę jeszcze przed formularzem.",
    icon: MousePointer2
  },
  {
    title: "Wybierz termin",
    description: "Dostępni specjaliści, daty i godziny są pokazane w jednym rytmie.",
    icon: CalendarCheck
  },
  {
    title: "Potwierdź rezerwację",
    description: "Podsumowanie redukuje pomyłki i daje poczucie kontroli.",
    icon: ClipboardCheck
  }
];

export function HowItWorks() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Jak to działa"
          title="Mniej telefonów, więcej pewnych wizyt"
          description="Rehavo prowadzi pacjenta przez decyzję bez presji i bez chaosu informacyjnego."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-3xl border border-graphite-900/8 bg-sand-50 p-6 transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-card">
                  <step.icon className="h-6 w-6 text-mint-700" aria-hidden="true" />
                </div>
                <span className="text-sm font-bold text-graphite-500">0{index + 1}</span>
              </div>
              <h3 className="text-xl font-semibold text-graphite-900">{step.title}</h3>
              <p className="mt-3 leading-7 text-graphite-500">{step.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
