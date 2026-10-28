'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site';
import { isNavItemActive } from '@/lib/navigation';
import GirihPattern from '@/components/ui/GirihPattern';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    const toggleButton = toggleRef.current;

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      toggleButton?.focus();
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        aria-label="Buka menu navigasi"
        className="focus-ring inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-control border border-divider text-brand-emerald hover:bg-surface-sage"
      >
        <svg aria-hidden="true" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h16M4 12h16M10 17h10" />
        </svg>
      </button>

      {/* Portal ke body: backdrop-filter pada header membuat elemen fixed terkurung di dalam header */}
      {isOpen &&
        createPortal(
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Menu navigasi">
          <div className="fixed inset-0 bg-brand-emerald-deep/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} aria-hidden="true" />

          <div
            id="mobile-nav-panel"
            className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-surface-white shadow-lift"
          >
            <div className="relative overflow-hidden bg-brand-emerald-deep px-6 pb-6 pt-5">
              <GirihPattern className="text-brand-gold/[0.15]" tileSize={44} />
              <div className="relative flex items-center justify-between">
                <span className="font-display text-lg font-semibold text-surface-white">SMP Inshafuddin</span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup menu navigasi"
                  className="focus-ring-dark flex min-h-[44px] min-w-[44px] items-center justify-center rounded-control text-ink-on-dark hover:bg-surface-white/10 hover:text-surface-white"
                >
                  <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="relative mt-1 text-xs text-brand-gold-light">Dayah Terpadu Inshafuddin · Banda Aceh</p>
            </div>

            <nav aria-label="Navigasi Utama (seluler)" className="flex flex-col gap-1 p-4">
              {siteConfig.navItems.map((item) => {
                const isActive = isNavItemActive(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`focus-ring flex min-h-[48px] items-center justify-between rounded-control px-4 text-base transition-colors ${
                      isActive
                        ? 'bg-surface-sage font-semibold text-brand-emerald'
                        : 'font-medium text-ink-primary hover:bg-surface-ivory hover:text-brand-emerald'
                    }`}
                  >
                    {item.label}
                    {isActive && <span aria-hidden="true" className="h-2 w-2 rotate-45 bg-brand-gold" />}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto border-t border-divider p-6 text-xs leading-relaxed text-ink-muted">
              <p>{siteConfig.contact.address}</p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="focus-ring mt-2 inline-block rounded font-semibold text-brand-emerald hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </div>
          </div>
        </div>,
          document.body,
        )}
    </div>
  );
}
