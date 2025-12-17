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

import { db } from "@/db";
import { settings } from "@/db/schema";

export async function generateMetadata(): Promise<Metadata> {
  const settingsData = await db.select().from(settings).limit(1);
  const siteSettings = settingsData[0];

  return {
    title: {
      default: siteSettings?.siteTitle || "42 Turizm | Personel ve Öğrenci Taşımacılığı",
      template: `%s | ${siteSettings?.siteTitle || "42 Turizm"}`
    },
    metadataBase: new URL('https://www.42turizm.com'),
    description: siteSettings?.siteDescription || "İstanbul'da güvenli, konforlu ve zamanında personel taşımacılığı, öğrenci servisi, VIP transfer ve filo kiralama hizmetleri. 42 Turizm ile yolculuğun keyfini çıkarın.",
    keywords: ["personel taşımacılığı", "öğrenci servisi", "vip transfer", "istanbul turizm", "filo kiralama", "gezi turları"],
    authors: [{ name: siteSettings?.siteTitle || "42 Turizm" }],
    creator: siteSettings?.siteTitle || "42 Turizm",
    icons: {
      icon: siteSettings?.faviconUrl || '/favicon.ico',
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: "https://www.42turizm.com",
      title: siteSettings?.siteTitle || "42 Turizm | Güvenli ve Konforlu Taşımacılık",
      description: siteSettings?.siteDescription || "İstanbul'un önde gelen turizm ve taşımacılık firması. Personel, öğrenci ve VIP taşımacılık çözümleri.",
      siteName: siteSettings?.siteTitle || "42 Turizm",
    },
    robots: {
      index: true,
      follow: true,
    }
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settingsData = await db.select().from(settings).limit(1);
  const siteSettings = settingsData[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteSettings?.siteTitle || "42 Turizm",
    "url": "https://www.42turizm.com",
    "logo": siteSettings?.logoUrl || "https://www.42turizm.com/logo.png",
    "description": siteSettings?.siteDescription || "İstanbul'da güvenli, konforlu ve zamanında personel taşımacılığı services.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": siteSettings?.phone1 || "+90 555 555 55 55",
      "contactType": "customer service"
    }
  };

  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
