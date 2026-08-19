import type { Metadata } from "next";
import { Newsreader, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "ConvertKit — Turn Files Into What You Need",
  description:
    "Convert documents, images, video, audio and data between formats. Free, fast, and private. No signup required for basic conversions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-canvas">
      <Auth0Provider>
        <body
          className={`${newsreader.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased bg-canvas text-ink`}
        >
          {children}
        </body>
      </Auth0Provider>
    </html>
  );
}
