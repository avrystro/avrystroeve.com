import type { Metadata } from "next";
import { Montserrat, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const headingFont = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const monoFont = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Avry Stroeve",
  description:
    "Explorer. Builder. Creator. God-first living, AI-amplified building, sovereign community.",
  openGraph: {
    title: "Avry Stroeve",
    description:
      "Explorer. Builder. Creator. God-first living, AI-amplified building, sovereign community.",
    type: "website",
    url: "https://avrystroeve.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avry Stroeve",
    description:
      "Explorer. Builder. Creator. God-first living, AI-amplified building, sovereign community.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${monoFont.variable} antialiased grain`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
