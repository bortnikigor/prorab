import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "PRORAB — Ремонт квартир, будинків та офісів",
  description:
    "Преміальний ремонт та оздоблення приміщень у Києві. Квартири, будинки, офіси — під ключ.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={`${geist.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
