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
  footer?: ReactNode;
  className?: string;
}

/** Kartu fasilitas dan kegiatan: gambar penuh dengan gradient emerald, teks di atas gambar. */
export default function MediaCard({
  title,
  description,
  tag,
  image,
  imageAlt,
  imageSizes,
  headingLevel: Heading = 'h3',
  footer,
  className = '',
}: MediaCardProps) {
  return (
    <article
      className={`group relative isolate flex min-h-[26rem] flex-col justify-end overflow-hidden rounded-card bg-brand-emerald-deep shadow-card transition-shadow duration-300 ease-out-expo hover:shadow-lift sm:min-h-[28rem] ${className}`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        sizes={imageSizes}
        className="-z-10 object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
      />
      {/* Gradient menempel pada blok teks agar selalu menutupi seluruh teks, sepanjang apa pun deskripsinya */}
      <div className="media-scrim px-6 pb-6 pt-24">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-gold-light">{tag}</p>
        <Heading className="font-display text-xl font-semibold leading-snug text-surface-white">{title}</Heading>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-on-dark">{description}</p>
        {footer && <div className="mt-5 border-t border-surface-white/15 pt-1">{footer}</div>}
      </div>
    </article>
  );
}
