import { MIHRAB_PATH } from './mihrab-path';

interface MihrabMarkProps {
  className?: string;
}

/** Siluet garis mihrab sebagai penanda dekoratif (kartu tanpa gambar, halaman 404/error). */
export default function MihrabMark({ className = 'h-8 w-6 text-brand-gold' }: MihrabMarkProps) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 1 1" preserveAspectRatio="none" className={className}>
      <path d={MIHRAB_PATH} fill="none" stroke="currentColor" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
