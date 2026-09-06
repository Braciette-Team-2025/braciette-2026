import type { Metadata } from "next";
import { jakarta, inter, sloop, theSeasons } from "@/src/styles/fonts";
import "./globals.css";
import { AuthProvider } from "../feature/auth/providers/AuthProvider";
import { ReactQueryProvider } from "../feature/auth/providers/ReactQueryProvider";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Braciate",
    template: "%s | Braciate",
  },
  description: "Brawijaya Festival Appreciate 2026",
  icons: {
    icon: "/images/logo/just_logo.svg",
  },
  openGraph: {
    title: "Braciate",
    description: "Brawijaya Festival Appreciate 2026",
    url: BASE_URL,
    siteName: "Braciate",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Braciate",
    description: "Brawijaya Festival Appreciate 2026",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <ReactQueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
