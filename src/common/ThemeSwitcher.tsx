'use client'

import { AnimationProps, motion } from 'motion/react'
import { useTheme } from 'next-themes'
import { PropsWithChildren, useMemo } from 'react'

import MoonLineIcon from '@/assets/icons/moon-line-icon.svg'
import SunLineIcon from '@/assets/icons/sun-line-icon.svg'
import ClientOnly from '@/common/ClientOnly'
import { Theme } from '@/enums/theme'
import { cn } from '@/theme/utils'

const INITIAL_THUMB = { x: 0, y: 0 }
const ANIMATED_THUMB = { x: '105%' }

export default function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()

  const isDarkTheme = useMemo(
    () => resolvedTheme === Theme.Dark,
    [resolvedTheme],
  )

  return (
    <div className='h-[36px]'>
      <ClientOnly>
        {() => (
          <div className='relative flex h-[36px] w-[140px] items-center justify-center overflow-hidden rounded-full bg-componentPrimary'>
            <ThemeSwitcherThumbBackdrop
              animate={isDarkTheme ? ANIMATED_THUMB : INITIAL_THUMB}
            />

            <ThemeSwitcherThumb>
              <SunLineIcon
                className={
                  isDarkTheme ? 'text-textSecondary' : 'text-textPrimary'
                }
              />
            </ThemeSwitcherThumb>
            <ThemeSwitcherThumb>
              <MoonLineIcon
                className={
                  isDarkTheme ? 'text-textPrimary' : 'text-textSecondary'
                }
              />
            </ThemeSwitcherThumb>

            <button
              className='absolute left-0 top-0 z-40 size-full'
              onClick={() => setTheme(isDarkTheme ? Theme.Light : Theme.Dark)}
            />
          </div>
        )}
      </ClientOnly>
    </div>
  )
}

function ThemeSwitcherThumb({ children }: PropsWithChildren) {
  return (
    <div className={cn('z-20 h-[32px] w-[66px] rounded-full px-[25px] py-2')}>
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
