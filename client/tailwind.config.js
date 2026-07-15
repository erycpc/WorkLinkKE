export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg:      '#141418',
          surface: '#212029',
          surface2:'#2A2A35',
          green:   '#0F6E56',
          greenL:  '#9FE1CB',
          border:  '#383845',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}