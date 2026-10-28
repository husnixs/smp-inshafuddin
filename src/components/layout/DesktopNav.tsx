'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';

export default function DesktopNav() {
  const pathname = usePathname();
  const normalizedPath = pathname ? (pathname.endsWith('/') ? pathname : `${pathname}/`) : '/';

  return (
    <nav aria-label="Navigasi Utama" className="hidden md:flex items-center gap-1.5 lg:gap-2">
      {siteConfig.navItems.map((item) => {
        const normalizedItem = item.href.endsWith('/') ? item.href : `${item.href}/`;
        const isActive =
          item.href === '/'
            ? normalizedPath === '/'
            : normalizedPath === normalizedItem || (item.href === '/berita/' && normalizedPath.startsWith('/berita/'));

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`px-3.5 py-2 rounded-lg text-sm transition-all min-h-[44px] flex items-center focus:outline-none focus:ring-2 focus:ring-brand-emerald ${
              isActive
                ? 'bg-brand-emerald text-surface-white font-semibold shadow-sm'
                : 'font-medium text-ink-primary hover:text-brand-emerald hover:bg-surface-sage/70'
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
