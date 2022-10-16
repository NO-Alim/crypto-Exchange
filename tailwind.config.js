module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#75efff',
        background: '#101c31',
        textPrimary: '#fff',
        borderPrimary: '#ccc',
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'translate(0, 0)', opacity: '0.5' },
          '100%': { transform: 'translate(0, 5px)', opacity: '1' },
        },
      },
      animation: {
        pulse: 'pulse 0.5s alternate infinite',
      },
      fontFamily: {
        poppins: ['Poppins'],
      },
    },
  },
};
