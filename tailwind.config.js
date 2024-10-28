// tailwind.config.js para ESM
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        naranja: '#FF7F11', // Color personalizado
      },
    },
  },
  plugins: [],
};
