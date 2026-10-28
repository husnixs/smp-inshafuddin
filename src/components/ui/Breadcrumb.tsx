import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { breadcrumbSchema, graph } from '@/lib/seo/jsonld';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  tone?: 'light' | 'dark';
}

/**
 * Breadcrumb dengan "Beranda" otomatis di awal; item terakhir menjadi halaman aktif.
 * Sekaligus menerbitkan JSON-LD BreadcrumbList dari data yang sama agar keduanya selalu sinkron.
 */
export default function Breadcrumb({ items, tone = 'light' }: BreadcrumbProps) {
  const trail: BreadcrumbItem[] = [{ label: 'Beranda', href: '/' }, ...items];
  const isDark = tone === 'dark';
  const linkClass = isDark
    ? 'text-ink-on-dark hover:text-surface-white focus-ring-dark'
    : 'text-ink-muted hover:text-brand-emerald focus-ring';
  const currentClass = isDark ? 'text-brand-gold-light' : 'text-brand-emerald';
  const separatorClass = isDark ? 'text-brand-gold/70' : 'text-brand-gold';

  const structuredData = graph(
    breadcrumbSchema(trail.map((item, index) => ({ name: item.label, path: index === trail.length - 1 ? undefined : item.href }))),
  );

  return (
    <nav aria-label="Breadcrumb" className="text-xs sm:text-sm">
      <JsonLd data={structuredData} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((item, index) => {
          const isLast = index === trail.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex min-w-0 items-center gap-2">
              {isLast || !item.href ? (
                <span aria-current={isLast ? 'page' : undefined} className={`line-clamp-1 font-semibold ${currentClass}`}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={`rounded transition-colors ${linkClass}`}>
                  {item.label}
                </Link>
              )}
              {!isLast && (
                <span aria-hidden="true" className={separatorClass}>
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
