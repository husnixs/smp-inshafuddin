import { useId } from 'react';

interface GirihPatternProps {
  className?: string;
  /** Ukuran satu petak pola dalam piksel. */
  tileSize?: number;
}

/**
 * Pola geometri bintang delapan (girih) yang halus sebagai tekstur latar.
 * Warna mengikuti `currentColor`, atur opasitas lewat className (mis. `text-brand-gold/20`).
 */
export default function GirihPattern({ className = '', tileSize = 56 }: GirihPatternProps) {
  const patternId = `girih-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const half = tileSize / 2;
  const inset = tileSize * 0.2857;
  const side = tileSize - inset * 2;
  const reach = tileSize * 0.1964;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    >
      <defs>
        <pattern id={patternId} width={tileSize} height={tileSize} patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth="1">
            <rect x={inset} y={inset} width={side} height={side} />
            <rect x={inset} y={inset} width={side} height={side} transform={`rotate(45 ${half} ${half})`} />
            <path
              d={`M0 0L${inset} ${inset}M${tileSize} 0L${tileSize - inset} ${inset}M0 ${tileSize}L${inset} ${tileSize - inset}M${tileSize} ${tileSize}L${tileSize - inset} ${tileSize - inset}M${half} 0V${reach}M${half} ${tileSize}V${tileSize - reach}M0 ${half}H${reach}M${tileSize} ${half}H${tileSize - reach}`}
            />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
