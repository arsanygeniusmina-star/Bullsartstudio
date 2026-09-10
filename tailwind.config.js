/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bulls-bg': '#0A0A0A',
        'bulls-black': '#000000',
        'bulls-surface': '#141414',
        'bulls-elevated': '#1A1A1A',
        'bulls-border': '#1E1E1E',
        'bulls-border-muted': '#2A2A2A',
        'bulls-text': '#FFFFFF',
        'bulls-muted': '#A1A1A1',
        'bulls-hint': '#6B6B6B',
        'bulls-red': '#E31E24',
        'bulls-red-dark': '#8B0000',
      },
      fontFamily: {
        display: ['"Chakra Petch"', 'monospace'],
        body: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.25em',
        widest3: '0.35em',
      },
      fontSize: {
        'fluid-xl': 'clamp(2.5rem, 7vw, 5rem)',
        'fluid-2xl': 'clamp(3rem, 9vw, 7rem)',
        'fluid-3xl': 'clamp(3.5rem, 12vw, 10rem)',
      },
      boxShadow: {
        'red-glow': '0 0 24px rgba(227,30,36,0.4), 0 0 80px rgba(227,30,36,0.15)',
        'red-glow-sm': '0 0 12px rgba(227,30,36,0.3)',
        'card': '0 4px 32px rgba(0,0,0,0.7)',
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #E31E24, #8B0000)',
        'hero-gradient': 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(227,30,36,0.06) 0%, transparent 70%)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
        'spin-slow': 'spin 8s linear infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
