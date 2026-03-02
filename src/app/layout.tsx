import type { Metadata } from "next";
import {
  EB_Garamond,
  Libre_Baskerville,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

// Global font tokens - swap these to change typography site-wide
const headingFont = EB_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const bodyFont = Libre_Baskerville({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Avry Stroeve",
  description: "Getting people into things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
