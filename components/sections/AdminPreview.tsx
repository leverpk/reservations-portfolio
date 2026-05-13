"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays, CreditCard, UsersRound } from "lucide-react";
import { adminAppointments } from "@/data/booking";
import { SectionHeading } from "@/components/ui/SectionHeading";

const badgeStyles: Record<string, string> = {
  Potwierdzona: "bg-mint-50 text-mint-700",
  Nowa: "bg-sand-100 text-graphite-700",
  Opłacona: "bg-graphite-900 text-white"
};

export function AdminPreview() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <SectionHeading
          align="left"
          eyebrow="Panel admina"
          title="Właściciel widzi dzień pracy bez arkuszy i notatek"
          description="Jedno miejsce na plan dnia, przychód tygodnia, statusy wizyt i najbliższe rezerwacje."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="rounded-[2rem] bg-graphite-900 p-3 shadow-soft"
        >
          <div className="rounded-[1.5rem] bg-white p-4 sm:p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint-700">
                  Rehavo Studio
                </p>
                <h3 className="mt-1 text-xl font-semibold text-graphite-900">
                  Dzisiejszy pulpit
                </h3>
              </div>
              <button
                type="button"
                aria-label="Otwórz szczegóły panelu"
                className="focus-ring grid h-10 w-10 place-items-center rounded-full bg-sand-50 text-graphite-900 transition hover:bg-mint-50"
              >
                <ArrowUpRight aria-hidden="true" size={18} />
              </button>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Metric icon={CalendarDays} label="Wizyty dziś" value="12" />
              <Metric icon={CreditCard} label="Przychód tydzień" value="8 420 zł" />
              <Metric icon={UsersRound} label="Nowi klienci" value="7" />
            </div>

            <div className="mt-5 rounded-3xl border border-graphite-900/8">
              <div className="border-b border-graphite-900/8 px-4 py-3">
                <h4 className="font-semibold text-graphite-900">Nadchodzące rezerwacje</h4>
              </div>
              <div className="divide-y divide-graphite-900/8">
                {adminAppointments.map((appointment) => (
                  <div
                    key={`${appointment.time}-${appointment.client}`}
                    className="grid gap-3 px-4 py-4 sm:grid-cols-[70px_1fr_auto] sm:items-center"
                  >
                    <span className="font-semibold text-graphite-900">{appointment.time}</span>
                    <div>
                      <p className="font-medium text-graphite-900">{appointment.client}</p>
                      <p className="mt-1 text-sm text-graphite-500">{appointment.service}</p>
                    </div>
                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                        badgeStyles[appointment.status]
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

type MetricProps = {
  icon: typeof CalendarDays;
  label: string;
  value: string;
};

function Metric({ icon: Icon, label, value }: MetricProps) {
  return (
    <div className="rounded-3xl bg-sand-50 p-4 ring-1 ring-graphite-900/6">
      <Icon className="h-5 w-5 text-mint-700" aria-hidden="true" />
      <p className="mt-4 text-sm text-graphite-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-graphite-900">{value}</p>
    </div>
  );
}
