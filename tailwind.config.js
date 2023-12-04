/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {
      minHeight:{
        '140': '140px',
      },
      borderRadius: {
        'large': '48px',
      },
      spacing: {
        '30': '7.5rem',
      },
      gradientColorStops: {
        'custom-start': '#ff62e3',
        'custom-end': '#2b63f3' 
      }
    },
  },
  plugins: [
    require('preline/plugin'),
  ],
}

