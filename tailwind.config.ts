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
          gold: '#BC9954',
        },
        surface: {
          ivory: '#FAF9F6',
          sage: '#E9F2EE',
          white: '#FFFFFF',
        },
        ink: {
          primary: '#192B27',
          muted: '#52615A',
        },
        divider: '#DCE6E0',
      },
      fontFamily: {
        sans: ['var(--font-plus-jakarta-sans)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1240px',
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
