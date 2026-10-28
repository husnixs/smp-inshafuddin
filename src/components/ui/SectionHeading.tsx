import type { ReactNode } from 'react';
import ArchDivider from './ArchDivider';

type Tone = 'light' | 'dark';
type HeadingLevel = 'h1' | 'h2';

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** Link/aksi di sisi kanan (desktop) untuk heading rata kiri. */
  action?: ReactNode;
  align?: 'left' | 'center';
  tone?: Tone;
  as?: HeadingLevel;
  id?: string;
}

const TONE_STYLES: Record<Tone, { eyebrow: string; title: string; description: string }> = {
  light: {
    eyebrow: 'text-brand-gold-ink',
    title: 'text-brand-emerald',
    description: 'text-ink-muted',
  },
  dark: {
    eyebrow: 'text-brand-gold-light',
    title: 'text-surface-white',
    description: 'text-ink-on-dark',
  },
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  tone = 'light',
  as: Heading = 'h2',
  id,
}: SectionHeadingProps) {
  const styles = TONE_STYLES[tone];
  const isCentered = align === 'center';

  const textBlock = (
    <div className={isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p
        className={`mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] ${styles.eyebrow}`}
      >
        <ArchDivider className="h-3 w-10 text-brand-gold" />
        {eyebrow}
      </p>
      <Heading
        id={id}
        className={`font-display text-[1.75rem] font-semibold leading-[1.15] tracking-tight sm:text-4xl ${styles.title}`}
      >
        {title}
      </Heading>
      {description && (
        <p className={`mt-4 text-base leading-relaxed ${styles.description}`}>{description}</p>
      )}
    </div>
  );

  if (!action || isCentered) {
    return <div className="mb-10 lg:mb-14">{textBlock}</div>;
  }

  return (
    <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between lg:mb-14">
      {textBlock}
      <div className="shrink-0">{action}</div>
    </div>
  );
}
