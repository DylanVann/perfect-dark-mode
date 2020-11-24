const tailwindPlugin = require('tailwindcss/plugin')
const tailwindPluginTypography = require('@tailwindcss/typography')
const tailwindPluginCustomForms = require('@tailwindcss/custom-forms')

const fontTitle = ['Libre Baskerville', 'serif']
const fontBody = ['Montserrat', 'sans-serif']

module.exports = {
  purge: {
    mode: 'all',
    content: ['src/*.pug', 'src/components/*.js', 'src/markdown/*.md'],
  },
  theme: {
    extend: {
      fontFamily: {
        title: fontTitle,
        body: fontBody,
      },
      colors: {
        color: 'var(--color)',
        background: 'var(--background)',
        white: 'var(--white)',
        black: 'var(--black)',
        gray: {
          100: 'var(--gray-100)',
          200: 'var(--gray-200)',
          300: 'var(--gray-300)',
          400: 'var(--gray-400)',
          500: 'var(--gray-500)',
          600: 'var(--gray-600)',
          700: 'var(--gray-700)',
          800: 'var(--gray-800)',
          900: 'var(--gray-900)',
        },
      },
      boxShadow: {
        outline: '0 0 0 3px var(--focus)',
      },
      typography: {
        DEFAULT: {
          css: {
            strong: {
              fontWeight: '900',
            },
            a: {
              fontWeight: false,
            },
            h1: {
              fontFamily: fontTitle,
              fontWeight: '700',
            },
            h2: {
              fontFamily: fontTitle,
              fontWeight: '700',
            },
            h3: {
              fontFamily: fontTitle,
              fontWeight: '700',
            },
            h4: {
              fontFamily: fontTitle,
              fontWeight: '700',
            },
            h5: {
              fontFamily: fontTitle,
              fontWeight: '700',
            },
            h6: {
              fontFamily: fontTitle,
              fontWeight: '700',
            },
            'code::before': false,
            'code::after': false,
          },
        },
      },
    },
  },
  variants: {
    borderWidth: ['focus'],
  },
  plugins: [
    tailwindPluginTypography,
    tailwindPluginCustomForms,
    tailwindPlugin(({ addUtilities }) =>
      addUtilities(
        {
          '.pl-sidebar': {
            paddingLeft: 'var(--sidebar-width)',
          },
          '.w-sidebar': {
            width: 'var(--sidebar-width)',
          },
        },
        ['responsive'],
      ),
    ),
  ],
}
