/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'float-up': 'float-up 0.6s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'float-hearts': 'float-hearts 8s linear infinite',
      },
      keyframes: {
        'float-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'float-hearts': {
          '0%': {
            transform: 'translateY(0) scale(0)',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100vh) scale(0.5)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
};
