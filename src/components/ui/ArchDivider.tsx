interface ArchDividerProps {
  className?: string;
}

/** Garis tipis dengan lengkung kecil di tengah, penanda eyebrow section. Warna mengikuti `currentColor`. */
export default function ArchDivider({ className = 'h-3 w-10 text-brand-gold' }: ArchDividerProps) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 40 12" className={className}>
      <path
        d="M0 11H14C14 5.5 16.7 1 20 1C23.3 1 26 5.5 26 11H40"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
      />
    </svg>
  );
}
