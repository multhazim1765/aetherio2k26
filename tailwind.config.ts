import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#030203',
        surface: '#0d0608',
        'surface-subtle': '#150a0d',
        'surface-hover': '#1f0e13',
        border: 'rgba(239, 68, 68, 0.15)',
        'border-hover': 'rgba(239, 68, 68, 0.4)',
        crimson: {
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        blood: {
          400: '#ff3344',
          500: '#e6001a',
          600: '#cc0017',
        },
        ember: {
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
        },
        dragon: {
          dark: '#080304',
          card: '#0f0709',
          glow: 'rgba(230, 0, 26, 0.4)',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'dragon-gradient': 'linear-gradient(135deg, rgba(230,0,26,0.2) 0%, rgba(249,115,22,0.15) 50%, rgba(13,6,8,0.9) 100%)',
        'dragon-card': 'linear-gradient(180deg, rgba(255, 50, 50, 0.06) 0%, rgba(20, 5, 8, 0.95) 100%)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'dragon-glow': 'dragonGlow 3s ease-in-out infinite alternate',
        'ember-float': 'emberFloat 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        dragonGlow: {
          '0%': { opacity: '0.4', filter: 'drop-shadow(0 0 20px rgba(230,0,26,0.4))' },
          '100%': { opacity: '0.85', filter: 'drop-shadow(0 0 35px rgba(249,115,22,0.6))' },
        },
        emberFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(10px, -15px) scale(1.1)' },
        }
      },
      boxShadow: {
        'dragon': '0 0 30px -5px rgba(230, 0, 26, 0.35)',
        'dragon-lg': '0 0 50px -5px rgba(230, 0, 26, 0.5), 0 0 20px rgba(249, 115, 22, 0.3)',
        'ember': '0 0 25px -5px rgba(249, 115, 22, 0.4)',
        'card-glow': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(239, 68, 68, 0.15)',
      }
    },
  },
  plugins: [],
};

export default config;
