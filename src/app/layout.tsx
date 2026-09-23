import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/BottomNav";
import TopSearchButton from "@/components/TopSearchButton";
import AppShell from "@/components/AppShell";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Acordes da Fé — Aprenda. Toque. Louve.",
  description:
    "Aprenda violão através de músicas cristãs: acordes, trocas, ritmos e prática guiada.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${fraunces.variable} ${manrope.variable} font-body min-h-screen`}
      >
        <TopSearchButton />
        <AppShell>{children}</AppShell>
        <BottomNav />
      </body>
    </html>
  );
}
