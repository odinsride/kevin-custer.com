const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.jsx'
    ],
    options: {
      whitelistPatternsChildren: [/^token/, /^pre/, /^code/],
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      gray: colors.gray,
      green: colors.teal,
      white: colors.white,
      black: colors.black,
      primary: colors.teal,
      secondary: colors.indigo,
      blue: colors.blue
    },
    extend: {
    },
    fontFamily: {
      sans: ['Mulish', 'sans-serif']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}