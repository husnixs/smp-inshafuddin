import type { Metadata } from 'next';
import { Fraunces, Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { DEFAULT_OG_IMAGE, SITE_LOCALE, SITE_NAME, SITE_SHORT_NAME, SITE_URL } from '@/lib/seo/config';
import { buildRobots } from '@/lib/seo/metadata';
import { HOME_DESCRIPTION, HOME_TITLE } from '@/lib/seo/pages';
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_SHORT_NAME}`,
  },
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: buildRobots(),
  openGraph: {
    type: 'website',
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
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
