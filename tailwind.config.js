module.exports = {
  darkMode: 'class', // or 'class' if you want to toggle manually
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}', // Include all pages
    './src/pages/components/**/*.{js,jsx,ts,tsx}', // Include all components
  ],
  theme: {
    extend: {
      fontFamily: {
        'space': ['Space', 'sans-serif'], // Your custom font
      },
      colors: {
        // Global colors
        aqua: "#0FB087",
        blue: "#4D9BE6",
        orange: "#B26419",
        pink: "#F04F78",
        
        // Dark mode colors (adjusted to be darker)
        'dark-aqua': "#0A7F63",
        'dark-blue': "#3C7DC6",
        'dark-orange': "#8A4D12",
        'dark-pink': "#C14D6C",

        // Light mode colors
        light: '#E3E1DA',
        dark: '#1C1E25',

        //Windows 95 Colors
        w_blue: "#000080",
        w_aqua: "#008080",
        w_light_gray: "#fffbf0",
        w_gray: "#c0c0c0",
        w_dark_gray: "#808080",
      },
      keyframes: {
        bootupAnimation: {
          '0%': { opacity: '0', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
};
