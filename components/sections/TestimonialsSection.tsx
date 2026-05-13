"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/booking";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function TestimonialsSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Opinie"
          title="Pacjenci czują różnicę jeszcze przed wizytą"
          description="Dobry system rezerwacji buduje zaufanie i zmniejsza liczbę pytań, które wcześniej wymagały telefonu."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.48, delay: index * 0.06 }}
              className="rounded-3xl bg-sand-50 p-6 ring-1 ring-graphite-900/6"
            >
              <Quote className="h-7 w-7 text-mint-700" aria-hidden="true" />
              <blockquote className="mt-5 leading-7 text-graphite-700">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-graphite-900/8 pt-4">
                <p className="font-semibold text-graphite-900">{testimonial.name}</p>
                <p className="mt-1 text-sm text-graphite-500">{testimonial.role}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
