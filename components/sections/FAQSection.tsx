"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/booking";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Najczęstsze pytania przed wdrożeniem"
          description="Krótko, konkretnie i z myślą o właścicielu studia, który chce lepiej obsługiwać rezerwacje."
        />
        <div className="mt-10 divide-y divide-graphite-900/8 rounded-3xl border border-graphite-900/8 bg-sand-50">
          {faqs.map((faq, index) => {
            const isOpen = index === openIndex;

            return (
              <div key={faq.question}>
                <button
                  type="button"
                  className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="font-semibold text-graphite-900">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-mint-700 transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 leading-7 text-graphite-500">{faq.answer}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
