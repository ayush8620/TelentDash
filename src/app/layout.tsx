import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/features/navbar";
import { Footer } from "@/components/features/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TalentDash — Career Intelligence Platform",
    template: "%s | TalentDash",
  },
  description:
    "Structured salary data, company insights, and compensation comparisons for informed career decisions. Compare offers across Google, Amazon, Microsoft, Flipkart and 50+ companies.",
  metadataBase: new URL("https://talentdash.com"),
  openGraph: {
    type: "website",
    siteName: "TalentDash",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-deep antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
