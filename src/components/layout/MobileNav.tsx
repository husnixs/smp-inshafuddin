'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Close nav on route change
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
        className="inline-flex items-center justify-center p-2 rounded-lg text-ink-primary hover:bg-surface-sage focus:outline-none focus:ring-2 focus:ring-brand-emerald min-w-[44px] min-h-[44px]"
      >
        <span className="sr-only">{isOpen ? 'Tutup' : 'Menu'}</span>
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 transition-opacity"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Panel */}
          <div className="relative ml-auto w-full max-w-xs bg-surface-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-divider">
                <span className="font-semibold text-brand-emerald text-sm tracking-wide uppercase">
                  Navigasi Sekolah
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup panel navigasi"
                  className="p-2 rounded-md text-ink-muted hover:bg-surface-sage min-w-[44px] min-h-[44px] flex items-center justify-center"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {siteConfig.navItems.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-colors min-h-[44px] flex items-center ${
                        isActive
                          ? 'bg-surface-sage text-brand-emerald font-semibold border-l-4 border-brand-emerald'
                          : 'text-ink-primary hover:bg-surface-ivory hover:text-brand-emerald'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-divider mt-6">
              <p className="text-xs text-ink-muted leading-relaxed">
                {siteConfig.contact.address}
              </p>
              <p className="text-xs text-brand-emerald mt-2 font-medium">
                {siteConfig.contact.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
