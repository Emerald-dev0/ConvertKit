import type { Metadata } from "next";
import { Inter, Bricolage_Grotesque, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "ConvertKit | Universal File Conversion Engine",
  description: "High-performance, developer-first conversion infrastructure. Open-source, local-first, and secure.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bricolage.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased bg-[#F7F6F3]`}
      >
        {children}
      </body>
    </html>
  );
}
