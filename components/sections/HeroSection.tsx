"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, Clock, MoveRight } from "lucide-react";
import { getNextAvailability, services, specialists, trustItems } from "@/data/booking";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  const featured = services[0];
  const featuredSpecialist = specialists.find((specialist) => specialist.id === "anna");
  const featuredAvailability = getNextAvailability({
    serviceId: featured.id,
    specialistId: "anna"
  });
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative px-4 pb-20 pt-6 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between py-4">
        <a href="#" className="flex items-center gap-3" aria-label="Rehavo">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-graphite-900 text-sm font-bold text-white">
            R
          </span>
          <span className="text-lg font-semibold tracking-tight text-graphite-900">
            Rehavo
          </span>
        </a>
        <a
          href="#rezerwacja"
          className="focus-ring rounded-full bg-white/75 px-4 py-2 text-sm font-semibold text-graphite-700 shadow-card transition hover:text-graphite-900"
        >
          Rezerwacja
        </a>
      </nav>

      <div className="mx-auto grid max-w-7xl gap-12 pt-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-xs font-semibold text-graphite-700 shadow-card ring-1 ring-graphite-900/5">
            <span className="h-2 w-2 rounded-full bg-mint-500" />
            Premium booking dla studiów terapii i ruchu
          </div>
          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-graphite-900 sm:text-6xl lg:text-7xl">
            Zarezerwuj wizytę bez telefonu
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite-500 sm:text-xl">
            Szybka rezerwacja online dla fizjoterapii i treningu medycznego:
            wybór usługi, specjalisty, terminu oraz czytelne potwierdzenie w
            jednym spokojnym interfejsie.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button icon onClick={() => scrollToSection("rezerwacja")}>
              Umów wizytę
            </Button>
            <Button variant="secondary" onClick={() => scrollToSection("uslugi")}>
              Zobacz usługi
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-3 rounded-2xl bg-white/70 p-3 text-sm font-medium text-graphite-700 shadow-card ring-1 ring-graphite-900/5"
              >
                <item.icon className="h-4 w-4 text-mint-700" aria-hidden="true" />
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative"
        >
          <div className="rounded-[2rem] bg-graphite-900 p-3 shadow-soft">
            <div className="rounded-[1.5rem] bg-white p-4 sm:p-6">
              <div className="flex items-center justify-between border-b border-graphite-900/8 pb-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint-700">
                    Rezerwacja online
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-graphite-900">
                    Pierwsza dostępna wizyta
                  </h2>
                </div>
                <span className="rounded-full bg-mint-50 px-3 py-1 text-xs font-bold text-mint-700">
                  2 min
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-sand-50 p-4 ring-1 ring-graphite-900/6">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-card">
                    <featured.icon className="h-6 w-6 text-mint-700" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-graphite-900">{featured.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-graphite-500">
                      {featured.duration} · {featured.price} zł · {featuredSpecialist?.name}
                    </p>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-mint-500" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-graphite-900/8 bg-white p-4">
                  <CalendarDays className="mb-3 h-5 w-5 text-mint-700" aria-hidden="true" />
                  <p className="text-xs text-graphite-500">Termin</p>
                  <p className="font-semibold text-graphite-900">
                    {featuredAvailability
                      ? `${featuredAvailability.date.day}, ${featuredAvailability.date.label}`
                      : "Brak terminu"}
                  </p>
                </div>
                <div className="rounded-2xl border border-graphite-900/8 bg-white p-4">
                  <Clock className="mb-3 h-5 w-5 text-mint-700" aria-hidden="true" />
                  <p className="text-xs text-graphite-500">Godzina</p>
                  <p className="font-semibold text-graphite-900">
                    {featuredAvailability?.time.label ?? "-"}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-graphite-900 p-4 text-white">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-white/70">Do potwierdzenia</p>
                    <p className="text-2xl font-semibold">{featured.price} zł</p>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-mint-500">
                    <MoveRight aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
