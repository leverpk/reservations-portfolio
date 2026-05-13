import {
  Activity,
  CalendarCheck,
  HeartPulse,
  type LucideIcon,
  ShieldCheck,
  Sparkles,
  UserRoundCheck
} from "lucide-react";

export type Service = {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  icon: LucideIcon;
};

export type Specialist = {
  id: string;
  name: string;
  role: string;
  rating: number;
  serviceIds: string[];
};

export type BookingDate = {
  id: string;
  label: string;
  day: string;
};

export type TimeSlot = {
  id: string;
  label: string;
};

export type AvailabilitySlot = {
  serviceId: string;
  specialistId: string;
  dateId: string;
  timeId: string;
};

export type NextAvailability = {
  date: BookingDate;
  time: TimeSlot;
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export const services: Service[] = [
  {
    id: "fizjoterapia",
    name: "Fizjoterapia",
    duration: "50 min",
    price: 180,
    description:
      "Indywidualna terapia bólu, pracy po urazie i powrotu do sprawności z planem zaleceń.",
    icon: HeartPulse
  },
  {
    id: "trening-medyczny",
    name: "Trening medyczny",
    duration: "60 min",
    price: 210,
    description:
      "Bezpieczny trening siłowy i ruchowy prowadzony po analizie ograniczeń oraz celu.",
    icon: Activity
  },
  {
    id: "konsultacja",
    name: "Konsultacja funkcjonalna",
    duration: "45 min",
    price: 160,
    description:
      "Ocena postawy, zakresów ruchu i wzorców obciążenia przed terapią lub treningiem.",
    icon: UserRoundCheck
  },
  {
    id: "masaz",
    name: "Masaż terapeutyczny",
    duration: "55 min",
    price: 170,
    description:
      "Praca manualna nad napięciem, regeneracją i komfortem ruchu po wysiłku lub stresie.",
    icon: Sparkles
  }
];

export const specialists: Specialist[] = [
  {
    id: "anna",
    name: "Anna Wysocka",
    role: "Fizjoterapeutka ortopedyczna",
    rating: 4.9,
    serviceIds: ["fizjoterapia", "konsultacja", "masaz"]
  },
  {
    id: "michal",
    name: "Michał Rataj",
    role: "Trener medyczny",
    rating: 4.8,
    serviceIds: ["trening-medyczny", "konsultacja"]
  },
  {
    id: "karolina",
    name: "Karolina Lewandowska",
    role: "Terapia manualna i powrót po kontuzji",
    rating: 5.0,
    serviceIds: ["fizjoterapia", "masaz"]
  }
];

export const bookingDates: BookingDate[] = [
  { id: "2026-05-13", label: "13 maja", day: "Środa" },
  { id: "2026-05-14", label: "14 maja", day: "Czwartek" },
  { id: "2026-05-15", label: "15 maja", day: "Piątek" },
  { id: "2026-05-18", label: "18 maja", day: "Poniedziałek" },
  { id: "2026-05-19", label: "19 maja", day: "Wtorek" }
];

export const timeSlots: TimeSlot[] = [
  { id: "09:00", label: "09:00" },
  { id: "10:30", label: "10:30" },
  { id: "12:15", label: "12:15" },
  { id: "16:30", label: "16:30" },
  { id: "18:00", label: "18:00" }
];

export const availabilitySlots: AvailabilitySlot[] = [
  {
    serviceId: "fizjoterapia",
    specialistId: "anna",
    dateId: "2026-05-13",
    timeId: "16:30"
  },
  {
    serviceId: "konsultacja",
    specialistId: "anna",
    dateId: "2026-05-14",
    timeId: "10:30"
  },
  {
    serviceId: "masaz",
    specialistId: "anna",
    dateId: "2026-05-15",
    timeId: "18:00"
  },
  {
    serviceId: "trening-medyczny",
    specialistId: "michal",
    dateId: "2026-05-14",
    timeId: "09:00"
  },
  {
    serviceId: "konsultacja",
    specialistId: "michal",
    dateId: "2026-05-15",
    timeId: "12:15"
  },
  {
    serviceId: "fizjoterapia",
    specialistId: "karolina",
    dateId: "2026-05-15",
    timeId: "12:15"
  },
  {
    serviceId: "masaz",
    specialistId: "karolina",
    dateId: "2026-05-18",
    timeId: "16:30"
  },
  {
    serviceId: "fizjoterapia",
    specialistId: "anna",
    dateId: "2026-05-19",
    timeId: "10:30"
  }
];

const todayDateId = "2026-05-13";
const tomorrowDateId = "2026-05-14";

export function getAvailableTimeSlots({
  serviceId,
  specialistId,
  dateId
}: {
  serviceId: string;
  specialistId: string;
  dateId: string;
}) {
  const slotIds = availabilitySlots
    .filter(
      (slot) =>
        slot.serviceId === serviceId &&
        slot.specialistId === specialistId &&
        slot.dateId === dateId
    )
    .map((slot) => slot.timeId);

  return timeSlots.filter((timeSlot) => slotIds.includes(timeSlot.id));
}

export function getAvailableDates({
  serviceId,
  specialistId
}: {
  serviceId: string;
  specialistId: string;
}) {
  const dateIds = availabilitySlots
    .filter((slot) => slot.serviceId === serviceId && slot.specialistId === specialistId)
    .map((slot) => slot.dateId);

  return bookingDates.filter((date) => dateIds.includes(date.id));
}

export function getNextAvailability({
  specialistId,
  serviceId
}: {
  specialistId: string;
  serviceId?: string;
}): NextAvailability | undefined {
  const nextSlot = availabilitySlots.find(
    (slot) =>
      slot.specialistId === specialistId && (!serviceId || slot.serviceId === serviceId)
  );

  if (!nextSlot) return undefined;

  const date = bookingDates.find((bookingDate) => bookingDate.id === nextSlot.dateId);
  const time = timeSlots.find((timeSlot) => timeSlot.id === nextSlot.timeId);

  if (!date || !time) return undefined;

  return { date, time };
}

export function getAvailabilityLabel({
  specialistId,
  serviceId
}: {
  specialistId: string;
  serviceId?: string;
}) {
  const availability = getNextAvailability({ specialistId, serviceId });

  if (!availability) return "Brak wolnych terminów";

  const relativeDate =
    availability.date.id === todayDateId
      ? "dziś"
      : availability.date.id === tomorrowDateId
        ? "jutro"
        : `${availability.date.day.toLowerCase()}, ${availability.date.label}`;

  return `Najbliżej: ${relativeDate} ${availability.time.label}`;
}

export const testimonials: Testimonial[] = [
  {
    name: "Marta K.",
    role: "pacjentka po kontuzji kolana",
    quote:
      "Rezerwacja trwała krócej niż napisanie wiadomości. Od razu widziałam cenę, czas i dostępne terminy."
  },
  {
    name: "Piotr S.",
    role: "trening medyczny",
    quote:
      "Studio wygląda profesjonalnie już od pierwszego kliknięcia. To buduje zaufanie przed wizytą."
  },
  {
    name: "Ola M.",
    role: "fizjoterapia kręgosłupa",
    quote:
      "Najbardziej doceniam jasne podsumowanie. Bez dzwonienia, bez czekania, bez niedomówień."
  }
];

export const faqs: FAQ[] = [
  {
    question: "Czy system działa bez recepcji?",
    answer:
      "Tak. Klient sam wybiera usługę, specjalistę, termin oraz godzinę, a studio otrzymuje gotową rezerwację do obsługi."
  },
  {
    question: "Czy mogę pokazać różne usługi i ceny?",
    answer:
      "Tak. Struktura danych pozwala dodać usługi, czas trwania, opis, cenę oraz przypisanych specjalistów."
  },
  {
    question: "Czy to jest połączone z backendem?",
    answer:
      "Proces rezerwacji może działać jako szybki formularz kontaktowy albo zostać rozszerzony o kalendarz, płatności i automatyczne powiadomienia."
  },
  {
    question: "Czy interfejs jest responsywny?",
    answer:
      "Tak. Układ jest projektowany mobile-first, a formularz rezerwacji zachowuje czytelny rytm na telefonie, tablecie i desktopie."
  }
];

export const adminAppointments = [
  { time: "09:00", client: "Marta K.", service: "Fizjoterapia", status: "Potwierdzona" },
  { time: "12:15", client: "Piotr S.", service: "Trening medyczny", status: "Nowa" },
  { time: "16:30", client: "Ola M.", service: "Masaż terapeutyczny", status: "Opłacona" }
];

export const trustItems = [
  { label: "Szybkie potwierdzenie", icon: CalendarCheck },
  { label: "Dane widoczne przed wizytą", icon: ShieldCheck },
  { label: "Czytelny plan dnia", icon: Activity }
];
