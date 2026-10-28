import type { ReactNode } from 'react';
import Breadcrumb, { type BreadcrumbItem } from './Breadcrumb';
import GirihPattern from './GirihPattern';
import StarMark from './StarMark';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  breadcrumb: BreadcrumbItem[];
  /** Konten tambahan di bawah deskripsi (mis. badge total artikel). */
  children?: ReactNode;
}

/** Header halaman dalam: pita emerald dengan pola girih dan H1 tunggal. */
export default function PageHero({ eyebrow, title, description, breadcrumb, children }: PageHeroProps) {
  return (
    <header className="relative isolate overflow-hidden bg-gradient-to-br from-brand-emerald-deep via-brand-emerald-deep to-brand-emerald">
      <GirihPattern className="text-brand-gold/[0.12]" />
      <div className="relative mx-auto max-w-content px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-10">
        <Breadcrumb items={breadcrumb} tone="dark" />
        <div className="mt-10 max-w-3xl lg:mt-14">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-gold-light">
            <StarMark className="h-3 w-3 text-brand-gold" />
            {eyebrow}
          </p>
          <h1 className="font-display text-[2.125rem] font-semibold leading-[1.1] tracking-tight text-surface-white sm:text-5xl">
            {title}
          </h1>
          {description && <p className="mt-5 text-base leading-relaxed text-ink-on-dark sm:text-lg">{description}</p>}
          {children && <div className="mt-6">{children}</div>}
        </div>
      </div>
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-brand-gold/0 via-brand-gold to-brand-gold/0" />
    </header>
  );
}
