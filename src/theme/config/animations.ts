import { ThemeConfig } from 'tailwindcss/types/config'

export const keyframes: ThemeConfig['keyframes'] = {
  swing: {
    '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
    '50%': { transform: 'translateY(-20%) rotate(-5deg)' },
  },
  'fade-in': {
    '0%': { opacity: '0', transform: 'translateY(20%)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },
}

export const animation: ThemeConfig['animation'] = {
  swing: 'swing 3s ease-in-out infinite',
  'fade-in': 'fade-in 0.5s ease-out',
}
