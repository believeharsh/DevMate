/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
     function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          'scrollbar-width': 'thin',
          'scrollbar-color': '#4b5563 #1f2937'
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: '#1f2937',
            'border-radius': '10px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'linear-gradient(180deg, #374151 0%, #4b5563 100%)',
            'border-radius': '10px',
            border: '1px solid #1f2937'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'linear-gradient(180deg, #4b5563 0%, #6b7280 100%)'
          }
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover'])
    }
  ],
  
}