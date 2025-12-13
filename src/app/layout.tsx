import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "42 Turizm | Personel ve Öğrenci Taşımacılığı",
    template: "%s | 42 Turizm"
  },
  description: "İstanbul'da güvenli, konforlu ve zamanında personel taşımacılığı, öğrenci servisi, VIP transfer ve filo kiralama hizmetleri. 42 Turizm ile yolculuğun keyfini çıkarın.",
  keywords: ["personel taşımacılığı", "öğrenci servisi", "vip transfer", "istanbul turizm", "filo kiralama", "gezi turları"],
  authors: [{ name: "42 Turizm" }],
  creator: "42 Turizm",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://www.42turizm.com",
    title: "42 Turizm | Güvenli ve Konforlu Taşımacılık",
    description: "İstanbul'un önde gelen turizm ve taşımacılık firması. Personel, öğrenci ve VIP taşımacılık çözümleri.",
    siteName: "42 Turizm",
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
