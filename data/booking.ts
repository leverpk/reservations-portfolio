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
  availability: string;
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
    availability: "Najbliżej: dziś 16:30",
    serviceIds: ["fizjoterapia", "konsultacja", "masaz"]
  },
  {
    id: "michal",
    name: "Michał Rataj",
    role: "Trener medyczny",
    rating: 4.8,
    availability: "Najbliżej: jutro 09:00",
    serviceIds: ["trening-medyczny", "konsultacja"]
  },
  {
    id: "karolina",
    name: "Karolina Lewandowska",
    role: "Terapia manualna i powrót po kontuzji",
    rating: 5.0,
    availability: "Najbliżej: piątek 12:15",
    serviceIds: ["fizjoterapia", "masaz"]
  }
];

export const bookingDates: BookingDate[] = [
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
