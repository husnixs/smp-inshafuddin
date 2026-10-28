import Link from 'next/link';
import Image from 'next/image';
import type { WPPost } from '@/types/wordpress';
import { extractFirstImage, stripHtml, formatIndonesianDate } from '@/lib/wordpress/extract';
import GirihPattern from '@/components/ui/GirihPattern';
import StarMark from '@/components/ui/StarMark';

const EXCERPT_LENGTH = 120;

interface NewsCardProps {
  post: WPPost;
  headingLevel?: 'h2' | 'h3';
  imageSizes: string;
}

function buildExcerpt(post: WPPost): string {
  const text = stripHtml(post.excerpt.rendered || post.content.rendered);
  return text.length > EXCERPT_LENGTH ? `${text.slice(0, EXCERPT_LENGTH).trimEnd()}…` : text;
}

/** Kartu berita dari WordPress. Seluruh area kartu dapat diklik melalui link judul. */
export default function NewsCard({ post, headingLevel: Heading = 'h3', imageSizes }: NewsCardProps) {
  const image = extractFirstImage(post.content.rendered);
  const title = stripHtml(post.title.rendered);
  const href = `/${post.slug}/`;

  return (
    <article className="group card-surface card-interactive relative flex flex-col overflow-hidden focus-within:ring-2 focus-within:ring-brand-emerald focus-within:ring-offset-2">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-sage">
        {image ? (
          <Image
            src={image}
            alt=""
            fill
            sizes={imageSizes}
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-brand-emerald">
            <GirihPattern className="text-brand-gold/20" tileSize={40} />
            <StarMark className="relative h-8 w-8 text-brand-gold-light" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-brand-gold-ink">
          <time dateTime={post.date}>{formatIndonesianDate(post.date)}</time>
          <span aria-hidden="true" className="h-1 w-1 rounded-full bg-brand-gold" />
          <span>Berita</span>
        </p>

        <Heading className="font-display text-lg font-semibold leading-snug text-ink-primary transition-colors group-hover:text-brand-emerald sm:text-xl">
          <Link href={href} className="line-clamp-3 focus:outline-none after:absolute after:inset-0">
            {title}
          </Link>
        </Heading>

        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">{buildExcerpt(post)}</p>

        <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-emerald">
          Baca selengkapnya
          <svg
            className="h-4 w-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </article>
  );
}
