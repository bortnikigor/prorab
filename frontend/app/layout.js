import { Montserrat } from "next/font/google";
import { LanguageProvider } from "./context/LanguageContext";
import CustomCursor from "./components/CustomCursor";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = {
  title: 'PRORAB — Ремонт квартир, будинків та офісів у Києві',
  description: 'Професійний ремонт під ключ у Києві. Дизайн-проект, авторський нагляд, гарантія 2 роки. Від кошторису до фінальної здачі.',
  keywords: 'ремонт квартир Київ, ремонт під ключ, дизайн інтер\'єру, ремонт офісів, будівництво будинків, PRORAB',
  metadataBase: new URL('https://prorab.ooo'),
  alternates: {
    canonical: 'https://prorab.ooo',
  },
  openGraph: {
    title: 'PRORAB — Ремонт під ключ у Києві',
    description: 'Реалізуємо інтер\'єри без спотворень. Від кошторису до фінальної здачі.',
    url: 'https://prorab.ooo',
    siteName: 'PRORAB',
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PRORAB — Ремонт під ключ у Києві',
    description: 'Реалізуємо інтер\'єри без спотворень. Від кошторису до фінальної здачі.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'PRORAB',
  description: 'Професійний ремонт під ключ у Києві',
  url: 'https://prorab.ooo',
  telephone: '+380958611898',
  email: 'request@prorab.ooo',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Naberezhno-Rybalska Street 3',
    addressLocality: 'Kyiv',
    addressCountry: 'UA',
  },
  openingHours: 'Mo-Fr 09:00-18:00',
  areaServed: 'Київ та Київська область',
  serviceType: ['Ремонт квартир', 'Ремонт офісів', 'Дизайн інтер\'єру', 'Ремонт будинків'],
  image: 'https://res.cloudinary.com/dpcqf9y8l/image/upload/v1778911578/prorab_bg_1920x1080_xhwcpb.png',
  priceRange: '₴₴₴',
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <meta name="theme-color" content="#0F1113" />
        <link rel="alternate" hrefLang="uk" href="https://prorab.ooo/" />
        <link rel="alternate" hrefLang="en" href="https://prorab.ooo/" />
      </head>
      <body className="min-h-screen antialiased">
        <CustomCursor />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
