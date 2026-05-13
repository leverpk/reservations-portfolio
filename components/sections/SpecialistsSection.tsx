"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { specialists } from "@/data/booking";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function SpecialistsSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Specjaliści"
          title="Zespół pokazany z dostępnością, nie tylko z opisem"
          description="Pacjent szybciej podejmuje decyzję, gdy widzi kompetencje, ocenę i najbliższy realny termin."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {specialists.map((specialist, index) => (
            <motion.article
              key={specialist.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.48, delay: index * 0.06 }}
              className="rounded-3xl border border-graphite-900/8 bg-white p-6 shadow-card transition hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-mint-100 to-sand-100 text-lg font-bold text-graphite-900">
                  {specialist.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>
                <div className="flex items-center gap-1 rounded-full bg-sand-50 px-3 py-1 text-sm font-semibold text-graphite-900">
                  <Star className="h-4 w-4 fill-mint-500 text-mint-500" aria-hidden="true" />
                  {specialist.rating}
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-graphite-900">
                {specialist.name}
              </h3>
              <p className="mt-2 min-h-12 text-sm leading-6 text-graphite-500">
                {specialist.role}
              </p>
              <p className="mt-5 rounded-2xl bg-mint-50 p-3 text-sm font-semibold text-mint-700">
                {specialist.availability}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
