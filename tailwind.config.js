module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './utils/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        '0': '0ms',
        '2000': '2000ms',
      },
      transitionDelay: {
        '0': '0ms',
        '2000': '2000ms',
      },
      colors: {
        orangeLight: '#ffe0b2',
        DEFAULT: '#f57c00',
        orangeDark: '#e65100',

      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        'mytheme': {
          'primary': '#386F22',
          'primary-focus': '#478722',
          'primary-content': '#ffffff',

        },

      },
    ],
  },
}
