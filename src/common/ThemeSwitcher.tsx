import { AnimationProps, motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { PropsWithChildren } from 'react'

import MoonLineIcon from '@/assets/icons/moon-line-icon.svg'
import SunLineIcon from '@/assets/icons/sun-line-icon.svg'
import ClientOnly from '@/common/ClientOnly'

const INITIAL_THUMB = { x: 0, y: 0 }
const ANIMATED_THUMB = { x: '105%' }

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <ClientOnly>
      {() => (
        <div className='relative flex h-[36px] w-[140px] items-center justify-center overflow-hidden rounded-full bg-componentPrimary'>
          <ThemeSwitcherThumbBackdrop
            animate={theme === 'dark' ? ANIMATED_THUMB : INITIAL_THUMB}
          />

          <ThemeSwitcherThumb>
            <SunLineIcon className='text-textPrimary' />
          </ThemeSwitcherThumb>
          <ThemeSwitcherThumb>
            <MoonLineIcon className='text-textPrimary' />
          </ThemeSwitcherThumb>

          <button
            className='absolute left-0 top-0 z-40 size-full'
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          />
        </div>
      )}
    </ClientOnly>
  )
}

function ThemeSwitcherThumb({ children }: PropsWithChildren) {
  return (
    <div className='z-20 h-[32px] w-[66px] rounded-full px-[25px] py-2'>
      {children}
    </div>
  )
}

function ThemeSwitcherThumbBackdrop(props: AnimationProps) {
  return (
    <motion.div
      {...props}
      className='absolute left-0.5 z-10 h-[32px] w-[66px] rounded-full bg-backgroundSurface1 px-[25px] py-2'
    />
  )
}
