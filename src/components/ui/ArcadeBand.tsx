import { useId } from 'react';

interface ArcadeBandProps {
  className?: string;
}

const ARCH_WIDTH = 28;
const BAND_HEIGHT = 15;
/** Alas lengkung sedikit di atas tepi bawah agar goresan tidak terpotong tepi petak. */
const BASELINE = 14.5;

/** Pita deretan lengkung tipis (serambi) sebagai tepi atas footer. Warna mengikuti `currentColor`. */
export default function ArcadeBand({ className = '' }: ArcadeBandProps) {
  const patternId = `arcade-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const radius = ARCH_WIDTH / 2;

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
            d={`M0 ${BASELINE}A${radius} ${radius} 0 0 1 ${ARCH_WIDTH} ${BASELINE}`}
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
