"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight, Mail, Phone, User } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { bookingDates, services, specialists, timeSlots } from "@/data/booking";
import type { BookingDate, Service, Specialist, TimeSlot } from "@/data/booking";
import { Button } from "@/components/ui/Button";
import { ProgressSteps } from "@/components/ui/ProgressSteps";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = ["Usługa", "Specjalista", "Data", "Godzina", "Dane", "Potwierdzenie"];

type ClientData = {
  name: string;
  email: string;
  phone: string;
};

type Errors = Partial<Record<keyof ClientData, string>>;

const initialClientData: ClientData = {
  name: "",
  email: "",
  phone: ""
};

export function BookingFlow() {
  const [step, setStep] = useState(0);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedSpecialistId, setSelectedSpecialistId] = useState("");
  const [selectedDateId, setSelectedDateId] = useState("");
  const [selectedTimeId, setSelectedTimeId] = useState("");
  const [clientData, setClientData] = useState<ClientData>(initialClientData);
  const [errors, setErrors] = useState<Errors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedService = services.find((service) => service.id === selectedServiceId);
  const filteredSpecialists = useMemo(
    () =>
      selectedServiceId
        ? specialists.filter((specialist) => specialist.serviceIds.includes(selectedServiceId))
        : specialists,
    [selectedServiceId]
  );
  const selectedSpecialist = specialists.find(
    (specialist) => specialist.id === selectedSpecialistId
  );
  const selectedDate = bookingDates.find((date) => date.id === selectedDateId);
  const selectedTime = timeSlots.find((time) => time.id === selectedTimeId);

  function canContinue() {
    if (step === 0) return Boolean(selectedServiceId);
    if (step === 1) return Boolean(selectedSpecialistId);
    if (step === 2) return Boolean(selectedDateId);
    if (step === 3) return Boolean(selectedTimeId);
    if (step === 4) return validateClientData();
    return true;
  }

  function validateClientData() {
    const nextErrors: Errors = {};

    if (!clientData.name.trim()) nextErrors.name = "Podaj imię i nazwisko.";
    if (!clientData.email.trim()) {
      nextErrors.email = "Podaj adres e-mail.";
    } else if (!/^\S+@\S+\.\S+$/.test(clientData.email)) {
      nextErrors.email = "Podaj poprawny adres e-mail.";
    }
    if (!clientData.phone.trim()) nextErrors.phone = "Podaj numer telefonu.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!canContinue()) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  function goBack() {
    setStep((current) => Math.max(current - 1, 0));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validateClientData()) return;
    setStep(5);
  }

  function confirmBooking() {
    setIsSuccess(true);
  }

  function resetBooking() {
    setStep(0);
    setSelectedServiceId("");
    setSelectedSpecialistId("");
    setSelectedDateId("");
    setSelectedTimeId("");
    setClientData(initialClientData);
    setErrors({});
    setIsSuccess(false);
  }

  return (
    <section id="rezerwacja" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Interaktywny flow"
          title="Rezerwacja, która wygląda jak część produktu"
          description="Pacjent przechodzi przez spokojny proces krok po kroku, a podsumowanie aktualizuje się od razu po każdym wyborze."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="rounded-[2rem] border border-graphite-900/8 bg-sand-50 p-4 shadow-soft sm:p-6">
            <ProgressSteps steps={steps} currentStep={step} />

            <div className="mt-6 min-h-[430px] rounded-[1.5rem] bg-white p-4 ring-1 ring-graphite-900/6 sm:p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isSuccess ? "success" : step}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.26 }}
                >
                  {isSuccess ? (
                    <SuccessState onReset={resetBooking} />
                  ) : (
                    <>
                      {step === 0 ? (
                        <ChoiceGrid<Service>
                          title="Wybierz usługę"
                          items={services}
                          selectedId={selectedServiceId}
                          onSelect={(service) => {
                            setSelectedServiceId(service.id);
                            setSelectedSpecialistId("");
                          }}
                          renderItem={(service) => (
                            <>
                              <div className="flex items-start gap-4">
                                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-mint-50">
                                  <service.icon
                                    className="h-5 w-5 text-mint-700"
                                    aria-hidden="true"
                                  />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-graphite-900">
                                    {service.name}
                                  </h3>
                                  <p className="mt-1 text-sm text-graphite-500">
                                    {service.duration} · {service.price} zł
                                  </p>
                                </div>
                              </div>
                              <p className="mt-4 text-sm leading-6 text-graphite-500">
                                {service.description}
                              </p>
                            </>
                          )}
                        />
                      ) : null}

                      {step === 1 ? (
                        <ChoiceGrid<Specialist>
                          title="Wybierz specjalistę"
                          items={filteredSpecialists}
                          selectedId={selectedSpecialistId}
                          onSelect={(specialist) => setSelectedSpecialistId(specialist.id)}
                          renderItem={(specialist) => (
                            <>
                              <div className="flex items-center justify-between gap-4">
                                <div>
                                  <h3 className="font-semibold text-graphite-900">
                                    {specialist.name}
                                  </h3>
                                  <p className="mt-1 text-sm text-graphite-500">
                                    {specialist.role}
                                  </p>
                                </div>
                                <span className="rounded-full bg-mint-50 px-3 py-1 text-sm font-semibold text-mint-700">
                                  {specialist.rating}
                                </span>
                              </div>
                              <p className="mt-4 text-sm font-medium text-graphite-700">
                                {specialist.availability}
                              </p>
                            </>
                          )}
                        />
                      ) : null}

                      {step === 2 ? (
                        <ChoiceGrid<BookingDate>
                          title="Wybierz datę"
                          items={bookingDates}
                          selectedId={selectedDateId}
                          onSelect={(date) => setSelectedDateId(date.id)}
                          compact
                          renderItem={(date) => (
                            <>
                              <p className="text-sm text-graphite-500">{date.day}</p>
                              <h3 className="mt-1 text-xl font-semibold text-graphite-900">
                                {date.label}
                              </h3>
                            </>
                          )}
                        />
                      ) : null}

                      {step === 3 ? (
                        <ChoiceGrid<TimeSlot>
                          title="Wybierz godzinę"
                          items={timeSlots}
                          selectedId={selectedTimeId}
                          onSelect={(time) => setSelectedTimeId(time.id)}
                          compact
                          renderItem={(time) => (
                            <h3 className="text-center text-2xl font-semibold text-graphite-900">
                              {time.label}
                            </h3>
                          )}
                        />
                      ) : null}

                      {step === 4 ? (
                        <form onSubmit={handleSubmit}>
                          <h2 className="text-2xl font-semibold text-graphite-900">
                            Dane do rezerwacji
                          </h2>
                          <p className="mt-2 text-sm leading-6 text-graphite-500">
                            Użyjemy ich wyłącznie do potwierdzenia wizyty i kontaktu w
                            sprawie terminu.
                          </p>
                          <div className="mt-6 grid gap-4">
                            <TextField
                              label="Imię i nazwisko"
                              icon={<User aria-hidden="true" size={18} />}
                              value={clientData.name}
                              error={errors.name}
                              onChange={(value) =>
                                setClientData((current) => ({ ...current, name: value }))
                              }
                            />
                            <TextField
                              label="Adres e-mail"
                              type="email"
                              icon={<Mail aria-hidden="true" size={18} />}
                              value={clientData.email}
                              error={errors.email}
                              onChange={(value) =>
                                setClientData((current) => ({ ...current, email: value }))
                              }
                            />
                            <TextField
                              label="Telefon"
                              type="tel"
                              icon={<Phone aria-hidden="true" size={18} />}
                              value={clientData.phone}
                              error={errors.phone}
                              onChange={(value) =>
                                setClientData((current) => ({ ...current, phone: value }))
                              }
                            />
                          </div>
                        </form>
                      ) : null}

                      {step === 5 ? (
                        <Confirmation
                          service={selectedService}
                          specialist={selectedSpecialist}
                          date={selectedDate}
                          time={selectedTime}
                          clientData={clientData}
                          onConfirm={confirmBooking}
                        />
                      ) : null}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {!isSuccess ? (
              <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <Button variant="ghost" onClick={goBack} disabled={step === 0}>
                  <ChevronLeft aria-hidden="true" size={16} />
                  Wstecz
                </Button>
                {step < 5 ? (
                  <Button onClick={step === 4 ? () => validateClientData() && setStep(5) : goNext}>
                    Dalej
                    <ChevronRight aria-hidden="true" size={16} />
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>

          <BookingSummary
            service={selectedService}
            specialist={selectedSpecialist}
            date={selectedDate}
            time={selectedTime}
            clientData={clientData}
          />
        </div>
      </div>
    </section>
  );
}

type Identifiable = {
  id: string;
};

type ChoiceGridProps<T extends Identifiable> = {
  title: string;
  items: T[];
  selectedId: string;
  compact?: boolean;
  onSelect: (item: T) => void;
  renderItem: (item: T) => React.ReactNode;
};

function ChoiceGrid<T extends Identifiable>({
  title,
  items,
  selectedId,
  compact,
  onSelect,
  renderItem
}: ChoiceGridProps<T>) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-graphite-900">{title}</h2>
      <div className={`mt-6 grid gap-3 ${compact ? "sm:grid-cols-2" : "md:grid-cols-2"}`}>
        {items.map((item) => {
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(item)}
              className={`focus-ring min-h-28 rounded-3xl border p-4 text-left transition hover:-translate-y-0.5 ${
                isSelected
                  ? "border-mint-500 bg-mint-50 shadow-card"
                  : "border-graphite-900/8 bg-white hover:border-mint-500/35"
              }`}
            >
              {renderItem(item)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type TextFieldProps = {
  label: string;
  value: string;
  error?: string;
  type?: string;
  icon: React.ReactNode;
  onChange: (value: string) => void;
};

function TextField({ label, value, error, type = "text", icon, onChange }: TextFieldProps) {
  const id = label.toLowerCase().replaceAll(" ", "-");

  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-graphite-900">
        {label}
      </label>
      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-graphite-900/10 bg-white px-4 py-3 text-graphite-500 focus-within:border-mint-500">
        {icon}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className="w-full bg-transparent text-base text-graphite-900 outline-none placeholder:text-graphite-500"
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type SummaryProps = {
  service?: Service;
  specialist?: Specialist;
  date?: BookingDate;
  time?: TimeSlot;
  clientData: ClientData;
};

function BookingSummary({ service, specialist, date, time, clientData }: SummaryProps) {
  return (
    <aside className="h-fit rounded-[2rem] border border-graphite-900/8 bg-graphite-900 p-5 text-white shadow-soft lg:sticky lg:top-6">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-mint-300">
        Podsumowanie
      </p>
      <h3 className="mt-3 text-2xl font-semibold">Twoja rezerwacja</h3>
      <div className="mt-6 grid gap-3">
        <SummaryRow label="Usługa" value={service?.name} />
        <SummaryRow label="Specjalista" value={specialist?.name} />
        <SummaryRow label="Data" value={date ? `${date.day}, ${date.label}` : undefined} />
        <SummaryRow label="Godzina" value={time?.label} />
        <SummaryRow label="Klient" value={clientData.name || undefined} />
      </div>
      <div className="mt-6 rounded-2xl bg-white/8 p-4">
        <p className="text-sm text-white/65">Do zapłaty w studio</p>
        <p className="mt-1 text-3xl font-semibold">{service ? `${service.price} zł` : "—"}</p>
      </div>
    </aside>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl bg-white/8 p-4">
      <p className="text-xs text-white/55">{label}</p>
      <p className="mt-1 font-semibold text-white">{value ?? "Wybierz w formularzu"}</p>
    </div>
  );
}

type ConfirmationProps = SummaryProps & {
  onConfirm: () => void;
};

function Confirmation({
  service,
  specialist,
  date,
  time,
  clientData,
  onConfirm
}: ConfirmationProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-graphite-900">Potwierdź rezerwację</h2>
      <p className="mt-2 text-sm leading-6 text-graphite-500">
        Sprawdź dane wizyty przed wysłaniem rezerwacji do studia.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Info label="Usługa" value={service?.name} />
        <Info label="Specjalista" value={specialist?.name} />
        <Info label="Termin" value={date ? `${date.day}, ${date.label}` : undefined} />
        <Info label="Godzina" value={time?.label} />
        <Info label="Klient" value={clientData.name} />
        <Info label="Kontakt" value={clientData.email} />
      </div>
      <Button className="mt-6 w-full sm:w-auto" onClick={onConfirm} icon>
        Potwierdź wizytę
      </Button>
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl bg-sand-50 p-4 ring-1 ring-graphite-900/6">
      <p className="text-xs text-graphite-500">{label}</p>
      <p className="mt-1 font-semibold text-graphite-900">{value}</p>
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <div className="grid min-h-[380px] place-items-center text-center">
      <div>
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint-50">
          <CheckCircle2 className="h-9 w-9 text-mint-700" aria-hidden="true" />
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-graphite-900">
          Rezerwacja potwierdzona
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-graphite-500">
          Na podany adres e-mail wyślemy szczegóły wizyty, a studio otrzyma komplet
          informacji potrzebnych do przygotowania spotkania.
        </p>
        <Button className="mt-7" variant="secondary" onClick={onReset}>
          Zrób kolejną rezerwację
        </Button>
      </div>
    </div>
  );
}
