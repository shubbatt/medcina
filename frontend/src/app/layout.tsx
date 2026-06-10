import type { Metadata } from 'next';
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getContactSettings } from '@/lib/api';

export const revalidate = 60;

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Medcina Pvt Ltd — Medical Supply Company',
    template: '%s | Medcina Pvt Ltd',
  },
  description:
    'Medcina provides medical equipment, consumables, and wound care products to clinics, hospitals, pharmacies, and healthcare professionals.',
  keywords: ['medical supplies', 'medical equipment', 'wound care', 'healthcare', 'medical consumables'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Medcina Pvt Ltd',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const contact = await getContactSettings().catch(() => ({ contact_phone: null }));

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Navbar phone={contact.contact_phone ?? undefined} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
