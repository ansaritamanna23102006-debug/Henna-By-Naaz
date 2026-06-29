import { Playfair_Display, Great_Vibes, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Henna by Naaz | Premium Luxury Mehendi Artist by Tabassum",
  description: "Bespoke, premium, and intricate bridal mehendi artistry by Tabassum. Offering professional home-visit services for weddings, engagements, festivals, and special celebrations.",
  keywords: [
    "Henna by Naaz",
    "Tabassum Mehendi Artist",
    "Home Visit Henna Artist",
    "Luxury Bridal Mehendi",
    "Professional Mehendi Artist",
    "Wedding Henna Designer",
    "Best Henna Artist",
    "Organic Henna Mehndi",
    "Mehendi Artist Near Me"
  ],
  authors: [{ name: "Tabassum" }],
  creator: "Tabassum",
  publisher: "Henna by Naaz",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Henna by Naaz | Premium Luxury Mehendi Artist by Tabassum",
    description: "Bespoke, premium, and intricate bridal mehendi artistry by Tabassum. Offering professional home-visit services.",
    url: "https://hennabynaaz.com",
    siteName: "Henna by Naaz",
    images: [
      {
        url: "/images/hero_mehendi.png",
        width: 800,
        height: 600,
        alt: "Henna by Naaz Bridal Mehendi Artistry",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Henna by Naaz | Premium Luxury Mehendi Artist by Tabassum",
    description: "Bespoke, premium, and intricate bridal mehendi artistry by Tabassum. Offering professional home-visit services.",
    images: ["/images/hero_mehendi.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${greatVibes.variable} ${inter.variable} h-full antialiased scroll-smooth`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col bg-bg-ivory text-primary">
        <Navbar />
        <main className="flex-1 flex flex-col relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

