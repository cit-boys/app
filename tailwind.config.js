module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{tsx,ts}', './components/**/*.{tsx,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      brightness: ['hover', 'focus'],
    },
  },
  plugins: [require('@tailwindcss/jit')],
}
