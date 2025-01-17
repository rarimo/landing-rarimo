import { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

import {
  colors,
  cssVars,
  fontFamily,
  gradients,
  screens,
  typography,
} from './src/theme/config'

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors,
      fontFamily,
      screens,
    },
  },
  plugins: [
    plugin(({ addBase }) =>
      addBase({
        ':root': {
          ...cssVars.light,
        },
        "[data-theme='dark']:root": {
          ...cssVars.dark,
        },
      }),
    ),

    plugin(({ addUtilities }) => {
      addUtilities(gradients)
    }),

    plugin(({ addUtilities }) => {
      addUtilities(typography)
    }),
  ],
}

export default config
