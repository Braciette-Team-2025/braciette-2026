import { Plus_Jakarta_Sans, Inter, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

export const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

/**
 * Serif untuk angka di podium. Font The Seasons DEMO menampilkan watermark
 * pada digit tertentu (mis. angka 4), jadi angka memakai font ini.
 */
export const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const sloop = localFont({
  src: "../fonts/sloop/Sloop Script Regular.ttf",
  variable: "--font-sloop",
  display: "swap",
});

export const theSeasons = localFont({
  src: [
    {
      path: "../fonts/the seasons/Fontspring-DEMO-theseasons-reg.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/the seasons/Fontspring-DEMO-theseasons-it.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/the seasons/Fontspring-DEMO-theseasons-bd.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/the seasons/Fontspring-DEMO-theseasons-bdit.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-the-seasons",
  display: "swap",
});
