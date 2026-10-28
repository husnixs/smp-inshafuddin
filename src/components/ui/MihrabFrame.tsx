import { useId, type ReactNode } from 'react';
import { MIHRAB_PATH } from './mihrab-path';

type OutlineTone = 'light' | 'dark';

interface MihrabFrameProps {
  /** Biasanya `next/image` dengan `fill`. */
  children: ReactNode;
  /** Garis emas tipis sejajar di luar bingkai. */
  outline?: boolean;
  /** `dark` untuk bingkai di atas latar emerald. */
  outlineTone?: OutlineTone;
  /** Rasio dan ukuran, mis. `aspect-[4/5] w-full`. */
  className?: string;
}

const OUTLINE_COLOR: Record<OutlineTone, string> = {
  light: 'text-brand-gold',
  dark: 'text-brand-gold-light',
};

/** Bingkai foto berpuncak lengkung runcing (mihrab), responsif terhadap ukuran wadah. */
export default function MihrabFrame({ children, outline = false, outlineTone = 'light', className = '' }: MihrabFrameProps) {
  const clipId = `mihrab-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  return (
    <div className={`relative ${className}`}>
      <svg aria-hidden="true" focusable="false" width="0" height="0" className="absolute">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={MIHRAB_PATH} />
          </clipPath>
        </defs>
      </svg>

      {outline && (
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1 1"
          preserveAspectRatio="none"
          className={`pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] sm:-inset-4 sm:h-[calc(100%+2rem)] sm:w-[calc(100%+2rem)] ${OUTLINE_COLOR[outlineTone]}`}
        >
          <path d={MIHRAB_PATH} fill="none" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </svg>
      )}

      <div className="absolute inset-0 overflow-hidden bg-surface-sage" style={{ clipPath: `url(#${clipId})` }}>
        {children}
      </div>
    </div>
  );
}
