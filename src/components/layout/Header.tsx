import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import StarMark from '@/components/ui/StarMark';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-divider/80 bg-surface-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-surface-white/80">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-control focus:bg-brand-emerald focus:px-4 focus:py-2 focus:text-surface-white focus:shadow-lift"
      >
        Menuju konten utama
      </a>

      {/* Pita identitas */}
      <div className="bg-brand-emerald-deep text-ink-on-dark">
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-2">
            <StarMark className="h-2.5 w-2.5 text-brand-gold" />
            <span className="hidden sm:inline">Bagian dari Dayah Terpadu Inshafuddin</span>
            <span className="sm:hidden">Dayah Terpadu Inshafuddin</span>
          </span>
          <span className="text-brand-gold-light">Banda Aceh</span>
        </div>
      </div>

      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="focus-ring flex shrink-0 items-center gap-3 rounded-control p-1">
            <span className="relative block h-11 w-32 sm:w-40">
              <Image
                src={siteConfig.logo.url}
                alt={siteConfig.logo.alt}
                fill
                priority
                sizes="(max-width: 640px) 128px, 160px"
                className="object-contain object-left"
              />
            </span>
          </Link>

          <DesktopNav />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
