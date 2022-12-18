/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '836px',
      // => @media (min-width: 1024px) { ... }

      xl: '1100px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1280px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        blue: 'hsl(235, 41%, 40%)',
        softRed: 'hsl(358, 79%, 66%)',
        lightGrayishBlue: 'hsl(239, 57%, 85%)',
        paleRed: 'hsl(356, 90%, 64%)',
        darkBlue: 'hsl(212, 24%, 26%)',
        grayishBlue: 'hsl(233, 33%, 16%)',
        lightGray: 'hsl(223, 19%, 93%)',
        veryLightGray: 'hsl(209, 61%, 16%)',
      },
      fontFamily: {
        sans: ['Alata', 'sans-serif'],
        mono: ['Volkhov', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
