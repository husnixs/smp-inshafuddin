import Image from 'next/image';
import type { ReactNode } from 'react';

type HeadingLevel = 'h2' | 'h3';

interface MediaCardProps {
  title: string;
  description: string;
  tag: string;
  image: string;
  imageAlt: string;
  imageSizes: string;
  headingLevel?: HeadingLevel;
  /** Rasio gambar; kartu unggulan pada bento memakai rasio lebih tinggi. */
  aspectClass?: string;
  footer?: ReactNode;
  className?: string;
}

/** Kartu bergambar untuk fasilitas dan kegiatan. */
export default function MediaCard({
  title,
  description,
  tag,
  image,
  imageAlt,
  imageSizes,
  headingLevel: Heading = 'h3',
  aspectClass = 'aspect-[16/10]',
  footer,
  className = '',
}: MediaCardProps) {
  return (
    <article className={`group card-surface card-interactive flex flex-col overflow-hidden ${className}`}>
      <div className="px-3 pt-3">
        <div className={`arch-top relative w-full overflow-hidden bg-surface-sage ${aspectClass}`}>
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes={imageSizes}
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-gold-ink">{tag}</p>
        <Heading className="font-display text-xl font-semibold leading-snug text-brand-emerald">{title}</Heading>
        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">{description}</p>
        {footer && <div className="mt-5 border-t border-divider pt-1">{footer}</div>}
      </div>
    </article>
  );
}
