import Link from 'next/link';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'gold';

interface ButtonLinkProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  /** Untuk tautan eksternal (mis. Google Maps). */
  external?: boolean;
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    'bg-brand-emerald text-surface-white shadow-card hover:bg-brand-emerald-hover hover:shadow-lift active:translate-y-px focus-ring',
  secondary:
    'border border-brand-emerald/25 bg-surface-white text-brand-emerald hover:border-brand-emerald hover:bg-surface-sage active:translate-y-px focus-ring',
  gold: 'bg-brand-gold-light text-brand-emerald-deep hover:bg-surface-white active:translate-y-px focus-ring-dark',
};

const BASE_STYLES =
  'group/btn inline-flex min-h-[48px] items-center justify-center gap-2 rounded-control px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out-expo';

export default function ButtonLink({ href, children, variant = 'primary', className = '', external = false }: ButtonLinkProps) {
  const classes = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
        <span className="sr-only">(membuka tab baru)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
