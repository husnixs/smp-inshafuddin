import Link from 'next/link';
import type { ReactNode } from 'react';

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  tone?: 'light' | 'dark';
  size?: 'sm' | 'md';
  className?: string;
}

/** Link teks dengan panah yang bergeser saat hover — dipakai untuk aksi sekunder. */
export default function ArrowLink({ href, children, tone = 'light', size = 'md', className = '' }: ArrowLinkProps) {
  const toneClass =
    tone === 'dark'
      ? 'text-brand-gold-light hover:text-surface-white focus-ring-dark'
      : 'text-brand-emerald hover:text-brand-emerald-hover focus-ring';
  const sizeClass = size === 'sm' ? 'text-sm' : 'text-sm sm:text-base';

  return (
    <Link
      href={href}
      className={`group/arrow inline-flex min-h-[44px] items-center gap-2 rounded-md font-semibold transition-colors ${sizeClass} ${toneClass} ${className}`}
    >
      <span className="underline decoration-brand-gold/60 decoration-2 underline-offset-[6px] transition-[text-decoration-color] group-hover/arrow:decoration-current">
        {children}
      </span>
      <svg
        aria-hidden="true"
        className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover/arrow:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  );
}
