interface StarMarkProps {
  className?: string;
}

/** Bintang delapan kecil sebagai penanda dekoratif (eyebrow, divider). */
export default function StarMark({ className = 'h-3 w-3' }: StarMarkProps) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 0l3.06 4.61L20.49 3.5l-1.1 5.44L24 12l-4.61 3.06 1.1 5.43-5.43-1.1L12 24l-3.06-4.61-5.43 1.1 1.1-5.43L0 12l4.61-3.06L3.5 3.51l5.44 1.1z" />
    </svg>
  );
}
