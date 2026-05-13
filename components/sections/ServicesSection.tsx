"use client";

import { motion } from "framer-motion";
import { services } from "@/data/booking";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesSection() {
  return (
    <section id="uslugi" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Usługi"
          title="Oferta opisana tak, jak pacjent chce ją wybrać"
          description="Każda usługa ma jasny zakres, czas i cenę, dzięki czemu decyzja jest spokojna i konkretna."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.48, delay: index * 0.06 }}
              className="group rounded-3xl border border-graphite-900/8 bg-white p-5 shadow-card transition hover:-translate-y-1 hover:border-mint-500/30"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-mint-50 transition group-hover:bg-mint-100">
                <service.icon className="h-6 w-6 text-mint-700" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-graphite-900">{service.name}</h3>
              <p className="mt-3 min-h-24 text-sm leading-6 text-graphite-500">
                {service.description}
              </p>
              <div className="mt-5 flex items-center justify-between border-t border-graphite-900/8 pt-4">
                <span className="text-sm text-graphite-500">{service.duration}</span>
                <span className="font-semibold text-graphite-900">{service.price} zł</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
