import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,md,html}'],
  theme: {
    extend: {
      colors: {
        // Add new semantic colors mapped to CSS variables
        primary: 'var(--color-bg-primary)',
        secondary: 'var(--color-bg-secondary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-inverted': 'var(--color-text-inverted)',
        'border-primary': 'var(--color-border-primary)',
        'border-interactive': 'var(--color-border-interactive)',
        'interactive-idle': 'var(--color-interactive-idle)',
        'interactive-hover': 'var(--color-interactive-hover)',
        'interactive-active': 'var(--color-interactive-active)',
        'interactive-active-text': 'var(--color-interactive-active-text)',
        'accent-primary': 'var(--color-accent-primary)',
        'accent-primary-hover': 'var(--color-accent-primary-hover)',
        'accent-danger': 'var(--color-accent-danger)',
        'accent-danger-hover': 'var(--color-accent-danger-hover)',
      },
      transitionProperty: {
        'width': 'width',
      },
      
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
      '20xl': '18rem',
    },
  },
  plugins: [
    typography, // Add the plugin here
  ],
};