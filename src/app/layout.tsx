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
  let siteSettings: typeof settings.$inferSelect | undefined;

  try {
    const settingsData = await db.select().from(settings).limit(1);
    siteSettings = settingsData[0];
  } catch (error) {
    console.warn("Could not fetch settings for metadata:", error);
    // Fallback or ignore for build time
  }

  return {
    title: {
      default: siteSettings?.siteTitle || "42 Turizm | Personel ve Öğrenci Taşımacılığı",
      template: `%s | ${siteSettings?.siteTitle || "42 Turizm"}`
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://42turizm.hasandurmus.com'),
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
      url: process.env.NEXT_PUBLIC_APP_URL || "https://42turizm.hasandurmus.com",
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
  let siteSettings: typeof settings.$inferSelect | undefined;

  try {
    const settingsData = await db.select().from(settings).limit(1);
    siteSettings = settingsData[0];
  } catch (error) {
    console.warn("Could not fetch settings for RootLayout:", error);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": siteSettings?.siteTitle || "42 Turizm",
    "url": process.env.NEXT_PUBLIC_APP_URL || "https://42turizm.hasandurmus.com",
    "logo": siteSettings?.logoUrl || `${process.env.NEXT_PUBLIC_APP_URL || "https://42turizm.hasandurmus.com"}/logo.png`,
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
        <ConditionalLayout settings={siteSettings}>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
