import type { WPPost } from '@/types/wordpress';
import SectionHeading from '@/components/ui/SectionHeading';
import ArrowLink from '@/components/ui/ArrowLink';
import NewsCard from '@/components/news/NewsCard';

const MAX_HOME_POSTS = 3;

interface LatestNewsSectionProps {
  posts: WPPost[];
}

export default function LatestNewsSection({ posts }: LatestNewsSectionProps) {
  return (
    <section aria-labelledby="news-heading" className="bg-surface-sand py-16 lg:py-24">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="news-heading"
          eyebrow="Kabar Sekolah"
          title="Berita & informasi terbaru"
          action={<ArrowLink href="/berita/">Buka arsip berita</ArrowLink>}
        />

        {posts.length === 0 ? (
          <div className="card-surface p-10 text-center">
            <p className="text-sm text-ink-muted">Belum ada berita yang dapat ditampilkan saat ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {posts.slice(0, MAX_HOME_POSTS).map((post) => (
              <NewsCard key={post.id} post={post} imageSizes="(max-width: 768px) 100vw, 400px" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
