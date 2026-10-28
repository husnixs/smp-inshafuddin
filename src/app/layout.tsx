import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/site';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700'],
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Membangun Ilmu & Akhlak`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'Website resmi SMP Inshafuddin Banda Aceh. Lembaga pendidikan Islam terpadu yang memadukan kurikulum nasional dan nilai-nilai dayah dalam membentuk karakter unggul dan religius.',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Membangun Ilmu & Akhlak`,
    description:
      'Lembaga pendidikan Islam terpadu yang memadukan kurikulum nasional dan nilai-nilai dayah dalam membentuk karakter unggul dan religius.',
    images: [
      {
        url: siteConfig.logo.url,
        width: 199,
        height: 73,
        alt: siteConfig.name,
      },
    ],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${fraunces.variable}`}>
      <body className="min-h-screen flex flex-col bg-surface-ivory font-sans text-ink-primary selection:bg-brand-emerald selection:text-surface-white">
        <Header />
        <main id="main-content" className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
