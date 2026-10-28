import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface-white/95 backdrop-blur-md border-b border-divider shadow-sm transition-all">
      {/* Skip to Content for A11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-emerald focus:text-surface-white focus:rounded-md focus:shadow-md"
      >
        Menuju konten utama
      </a>

      {/* Top Banner Ribbon */}
      <div className="bg-brand-emerald text-surface-white py-1.5 px-4 text-xs font-medium">
        <div className="max-w-content mx-auto flex justify-between items-center">
          <span className="hidden sm:inline">
            Lingkungan Pendidikan Islami Berkarakter & Unggul Prestasi
          </span>
          <span className="sm:hidden font-semibold">SMP Inshafuddin Banda Aceh</span>
          <span className="text-surface-sage/90">Banda Aceh, Indonesia</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & School Identity */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-brand-emerald rounded-lg p-1">
            <div className="relative w-36 sm:w-44 h-12 flex items-center">
              <Image
                src={siteConfig.logo.url}
                alt={siteConfig.logo.alt}
                fill
                priority
                sizes="(max-width: 640px) 144px, 176px"
                className="object-contain object-left"
              />
            </div>
            <div className="hidden lg:block border-l border-divider pl-3">
              <span className="block text-xs font-bold text-brand-emerald tracking-wide uppercase">
                SMP Inshafuddin
              </span>
              <span className="block text-[11px] text-ink-muted">
                Dayah Terpadu Inshafuddin
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNav />

          {/* Mobile Nav Button */}
          <MobileNav />
        </div>
      </div>

      {/* Thin Gold Subtle Accent Line */}
      <div className="h-[2px] bg-gradient-to-r from-brand-emerald via-brand-gold to-brand-emerald opacity-60" />
    </header>
  );
}
