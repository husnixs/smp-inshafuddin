'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { isNavItemActive } from '@/lib/navigation';

export default function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigasi Utama" className="hidden items-center gap-1 md:flex">
      {siteConfig.navItems.map((item) => {
        const isActive = isNavItemActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={`focus-ring relative flex min-h-[44px] items-center rounded-control px-3 text-sm transition-colors lg:px-3.5 ${
              isActive
                ? 'font-semibold text-brand-emerald'
                : 'font-medium text-ink-muted hover:bg-surface-sage/70 hover:text-brand-emerald'
            }`}
          >
            {item.label}
            <span
              aria-hidden="true"
              className={`absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-gold transition-transform duration-300 ease-out-expo lg:inset-x-3.5 ${
                isActive ? 'scale-x-100' : 'scale-x-0'
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
