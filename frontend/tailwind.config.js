/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#263F70',
          secondary: '#4F6FAF',
        },
        surface: '#F5F7FA',
        ink: '#252D39',
        muted: '#64748B',
        line: '#D6DDE7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(37, 45, 57, 0.05)',
        'card-hover': '0 4px 12px rgba(37, 45, 57, 0.08)',
      },
    },
  },
  plugins: [],
};
