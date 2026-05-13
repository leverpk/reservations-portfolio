import { NextRequest, NextResponse } from "next/server";
import {
  bookingDates,
  getAvailableTimeSlots,
  services,
  specialists,
  timeSlots
} from "@/data/booking";

const resendApiUrl = "https://api.resend.com/emails";

type BookingRequest = {
  serviceId: string;
  specialistId: string;
  dateId: string;
  timeId: string;
  client: {
    name: string;
    email: string;
    phone: string;
  };
};

type BookingDetails = {
  service: {
    name: string;
    duration: string;
    price: number;
  };
  specialist: {
    name: string;
    role: string;
  };
  date: {
    day: string;
    label: string;
  };
  time: {
    label: string;
  };
  client: BookingRequest["client"];
};

type ResendEmail = {
  from: string;
  to: string[];
  subject: string;
  html: string;
  text: string;
};

export async function POST(request: NextRequest) {
  const payload = await parseBookingRequest(request);

  if (!payload.ok) {
    return NextResponse.json({ message: payload.message }, { status: 400 });
  }

  const booking = buildBookingDetails(payload.data);

  if (!booking.ok) {
    return NextResponse.json({ message: booking.message }, { status: 400 });
  }

  // Configure these values in .env.local. Never commit real secrets to git.
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const studioOwnerEmail = process.env.STUDIO_OWNER_EMAIL;

  if (!resendApiKey || !fromEmail || !studioOwnerEmail) {
    return NextResponse.json(
      {
        message:
          "Brakuje konfiguracji e-mail. Ustaw RESEND_API_KEY, RESEND_FROM_EMAIL i STUDIO_OWNER_EMAIL."
      },
      { status: 500 }
    );
  }

  const ownerEmail = createOwnerEmail({
    fromEmail,
    studioOwnerEmail,
    booking: booking.data
  });
  const clientEmail = createClientEmail({
    fromEmail,
    booking: booking.data
  });

  try {
    const responses = await Promise.all([
      sendResendEmail({ apiKey: resendApiKey, email: ownerEmail }),
      sendResendEmail({ apiKey: resendApiKey, email: clientEmail })
    ]);

    const failedResponse = responses.find((response) => !response.ok);

    if (failedResponse) {
      return NextResponse.json(
        { message: "Nie udało się wysłać wiadomości e-mail." },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Rezerwacja wysłana." });
  } catch {
    return NextResponse.json(
      { message: "Nie udało się połączyć z usługą wysyłki e-mail." },
      { status: 502 }
    );
  }
}

async function parseBookingRequest(
  request: NextRequest
): Promise<{ ok: true; data: BookingRequest } | { ok: false; message: string }> {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return { ok: false, message: "Niepoprawny format danych rezerwacji." };
  }

  if (!isRecord(body)) {
    return { ok: false, message: "Niepoprawne dane rezerwacji." };
  }

  const client = body.client;

  if (!isRecord(client)) {
    return { ok: false, message: "Brakuje danych klienta." };
  }

  const bookingRequest = {
    serviceId: readString(body.serviceId),
    specialistId: readString(body.specialistId),
    dateId: readString(body.dateId),
    timeId: readString(body.timeId),
    client: {
      name: readString(client.name),
      email: readString(client.email),
      phone: readString(client.phone)
    }
  };

  const missingRequiredField =
    !bookingRequest.serviceId ||
    !bookingRequest.specialistId ||
    !bookingRequest.dateId ||
    !bookingRequest.timeId ||
    !bookingRequest.client.name ||
    !bookingRequest.client.email ||
    !bookingRequest.client.phone;

  if (missingRequiredField) {
    return { ok: false, message: "Uzupełnij wszystkie wymagane pola." };
  }

  if (!/^\S+@\S+\.\S+$/.test(bookingRequest.client.email)) {
    return { ok: false, message: "Podaj poprawny adres e-mail." };
  }

  return { ok: true, data: bookingRequest };
}

function buildBookingDetails(
  payload: BookingRequest
): { ok: true; data: BookingDetails } | { ok: false; message: string } {
  const service = services.find((item) => item.id === payload.serviceId);
  const specialist = specialists.find((item) => item.id === payload.specialistId);
  const date = bookingDates.find((item) => item.id === payload.dateId);
  const time = timeSlots.find((item) => item.id === payload.timeId);

  if (!service || !specialist || !date || !time) {
    return { ok: false, message: "Wybrana rezerwacja jest niepoprawna." };
  }

  const availableTime = getAvailableTimeSlots({
    serviceId: payload.serviceId,
    specialistId: payload.specialistId,
    dateId: payload.dateId
  }).find((slot) => slot.id === payload.timeId);

  if (!specialist.serviceIds.includes(service.id) || !availableTime) {
    return { ok: false, message: "Wybrany termin nie jest już dostępny." };
  }

  return {
    ok: true,
    data: {
      service: {
        name: service.name,
        duration: service.duration,
        price: service.price
      },
      specialist: {
        name: specialist.name,
        role: specialist.role
      },
      date: {
        day: date.day,
        label: date.label
      },
      time: {
        label: time.label
      },
      client: payload.client
    }
  };
}

async function sendResendEmail({ apiKey, email }: { apiKey: string; email: ResendEmail }) {
  return fetch(resendApiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(email)
  });
}

function createOwnerEmail({
  fromEmail,
  studioOwnerEmail,
  booking
}: {
  fromEmail: string;
  studioOwnerEmail: string;
  booking: BookingDetails;
}): ResendEmail {
  const subject = `Nowa rezerwacja: ${booking.service.name}`;

  return {
    from: fromEmail,
    to: [studioOwnerEmail],
    subject,
    html: createEmailHtml({
      title: "Nowa rezerwacja w Rehavo",
      intro: "Klient potwierdził wizytę przez formularz online.",
      booking
    }),
    text: createEmailText({
      title: "Nowa rezerwacja w Rehavo",
      intro: "Klient potwierdził wizytę przez formularz online.",
      booking
    })
  };
}

function createClientEmail({
  fromEmail,
  booking
}: {
  fromEmail: string;
  booking: BookingDetails;
}): ResendEmail {
  const subject = `Potwierdzenie wizyty: ${booking.service.name}`;

  return {
    from: fromEmail,
    to: [booking.client.email],
    subject,
    html: createEmailHtml({
      title: "Twoja wizyta została potwierdzona",
      intro: "Dziękujemy za rezerwację. Poniżej znajdziesz szczegóły wizyty.",
      booking
    }),
    text: createEmailText({
      title: "Twoja wizyta została potwierdzona",
      intro: "Dziękujemy za rezerwację. Poniżej znajdziesz szczegóły wizyty.",
      booking
    })
  };
}

function createEmailHtml({
  title,
  intro,
  booking
}: {
  title: string;
  intro: string;
  booking: BookingDetails;
}) {
  const rows = [
    ["Usługa", `${booking.service.name} (${booking.service.duration})`],
    ["Specjalista", `${booking.specialist.name} - ${booking.specialist.role}`],
    ["Termin", `${booking.date.day}, ${booking.date.label}, ${booking.time.label}`],
    ["Cena", `${booking.service.price} zł`],
    ["Klient", booking.client.name],
    ["E-mail", booking.client.email],
    ["Telefon", booking.client.phone]
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #171a18; line-height: 1.6;">
      <h1 style="margin: 0 0 12px; font-size: 24px;">${escapeHtml(title)}</h1>
      <p style="margin: 0 0 24px; color: #3d403d;">${escapeHtml(intro)}</p>
      <table style="border-collapse: collapse; width: 100%; max-width: 560px;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border-top: 1px solid #ececea; padding: 12px 0; color: #72736e; width: 130px;">${escapeHtml(label)}</td>
                <td style="border-top: 1px solid #ececea; padding: 12px 0; font-weight: 600;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
    </div>
  `;
}

function createEmailText({
  title,
  intro,
  booking
}: {
  title: string;
  intro: string;
  booking: BookingDetails;
}) {
  return [
    title,
    intro,
    "",
    `Usługa: ${booking.service.name} (${booking.service.duration})`,
    `Specjalista: ${booking.specialist.name} - ${booking.specialist.role}`,
    `Termin: ${booking.date.day}, ${booking.date.label}, ${booking.time.label}`,
    `Cena: ${booking.service.price} zł`,
    `Klient: ${booking.client.name}`,
    `E-mail: ${booking.client.email}`,
    `Telefon: ${booking.client.phone}`
  ].join("\n");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
