import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rehavo | System rezerwacji dla fizjoterapii",
  description:
    "Premium landing page i interaktywny system rezerwacji online dla studia fizjoterapii oraz treningu medycznego."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
