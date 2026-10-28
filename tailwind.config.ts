import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          emerald: '#103F35',
          'emerald-hover': '#0A312A',
          'emerald-deep': '#0B2E27',
          'emerald-soft': '#1C5A4B',
          // Emas dekoratif: garis, ornamen, border. Bukan untuk teks kecil di latar terang (2,68:1).
          gold: '#BC9954',
          // Emas untuk teks di latar terang (≥5,4:1 pada white/ivory/sand).
          'gold-ink': '#7A5C22',
          // Emas untuk teks/aksen di latar emerald (≥7,2:1).
          'gold-light': '#E3C88C',
        },
        surface: {
          ivory: '#FAF9F6',
          sand: '#F4EFE4',
          sage: '#E9F2EE',
          white: '#FFFFFF',
        },
        ink: {
          primary: '#192B27',
          muted: '#52615A',
          'on-dark': '#C9DCD3',
        },
        divider: '#DCE6E0',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
      maxWidth: {
        content: '1240px',
      },
      borderRadius: {
        control: '12px',
        card: '16px',
        hero: '24px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 63, 53, 0.04), 0 4px 16px -6px rgba(16, 63, 53, 0.08)',
        lift: '0 2px 4px rgba(16, 63, 53, 0.05), 0 18px 40px -14px rgba(16, 63, 53, 0.22)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
