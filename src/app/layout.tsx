import type { Metadata } from "next";
import { jakarta, inter, sloop, theSeasons } from "@/src/styles/fonts";
import "./globals.css";
import { AuthProvider } from "../feature/auth/providers/AuthProvider";
import { ReactQueryProvider } from "../feature/auth/providers/ReactQueryProvider";
import { NavigationLoadingProvider } from "../feature/shared/providers/NavigationLoadingProvider";
import { Suspense } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const SITE_NAME = "Braciate 2026";

const DESCRIPTION =
  "Brawijaya Appreciate merupakan program kerja dari Kementerian Dalam Negeri Eksekutif Mahasiswa Universitas Brawijaya yang berbentuk malam penghargaan dengan tujuan sebagai bentuk kolaborasi, harmonisasi, dan apresiasi untuk simpul Brawijaya, yaitu BEM, DPM, HIMA, dan UKM.";

export const metadata: Metadata = {
  metadataBase: BASE_URL ? new URL(BASE_URL) : undefined,
  title: {
    default: "Braciate",
    template: "%s | Braciate",
  },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: "/images/logo/just_logo.svg",
  },
  openGraph: {
    title: "Braciate",
    description: DESCRIPTION,
    url: BASE_URL ?? "",
    siteName: SITE_NAME,
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Braciate",
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  alternateName: ["Braciate", "Brawijaya Festival Appreciate 2026"],
  ...(BASE_URL ? { url: BASE_URL } : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${inter.variable} ${sloop.variable} ${theSeasons.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <ReactQueryProvider>
          <AuthProvider>
            <Suspense>
              <NavigationLoadingProvider>{children}</NavigationLoadingProvider>
            </Suspense>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
