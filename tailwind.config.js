const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './utils/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '320px',
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        orangeLight: '#ffe0b2',
        input: '#8eba75',
        isDisabled: '#b7bab9',
        profileColor: '#162c0d',
        editModeTextColor: '#88f24a',
        borderColorInEditMode: '#88f24a',
        DEFAULT: '#f57c00',
        orangeDark: '#e65100',
        textButton: '#bbf7d0',
        textColor: '#f0fff0',
        successAlert: '#bbf7d0',
        succesAlertBorder: '#4ade80'
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.1s ease'
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
          'disabled': '#b7bab9'

        },

      },
    ],
  },
}
