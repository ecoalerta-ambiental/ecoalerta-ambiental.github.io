/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        emerald: {
          DEFAULT: 'var(--color-emerald)',
          500: 'var(--color-emerald)',
        },
        surface: {
          glass: 'var(--color-surface-glass)',
          'glass-emerald': 'var(--color-surface-glass-emerald)',
        },
        content: {
          primary: 'var(--color-content-primary)',
          secondary: 'var(--color-content-secondary)',
        },
        border: {
          glass: 'var(--color-border-glass)',
        },
      },
      backdropBlur: {
        glass: 'var(--blur-glass)',
        moderate: 'var(--blur-moderate)',
      },
      boxShadow: {
        glass: 'var(--shadow-glass)',
        'glass-glow': 'var(--shadow-glass-glow)',
        glow: 'var(--shadow-glow)',
        'glow-strong': 'var(--shadow-glow-strong)',
      },
      maxWidth: {
        content: 'var(--content-max-width)',
      },
      borderRadius: {
        card: 'var(--radius-card)',
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(var(--motion-enter-distance))' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(calc(-1 * var(--motion-float-distance)))' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up var(--motion-fade-in-duration) ease-out both',
        float: 'float var(--motion-float-duration) ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
