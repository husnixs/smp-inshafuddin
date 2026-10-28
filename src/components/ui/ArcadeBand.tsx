import { useId } from 'react';

interface ArcadeBandProps {
  className?: string;
}

const ARCH_WIDTH = 28;
const BAND_HEIGHT = 14;

/** Pita deretan lengkung tipis (serambi) sebagai tepi atas footer. Warna mengikuti `currentColor`. */
export default function ArcadeBand({ className = '' }: ArcadeBandProps) {
  const patternId = `arcade-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const half = ARCH_WIDTH / 2;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height={BAND_HEIGHT}
      className={`pointer-events-none block w-full ${className}`}
    >
      <defs>
        <pattern id={patternId} width={ARCH_WIDTH} height={BAND_HEIGHT} patternUnits="userSpaceOnUse">
          <path
            d={`M0 ${BAND_HEIGHT}V${half}A${half} ${half} 0 0 1 ${ARCH_WIDTH} ${half}V${BAND_HEIGHT}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height={BAND_HEIGHT} fill={`url(#${patternId})`} />
    </svg>
  );
}
