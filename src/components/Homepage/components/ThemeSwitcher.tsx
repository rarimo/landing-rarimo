import { AnimationProps, motion, useAnimation } from 'motion/react'
import { PropsWithChildren, useState } from 'react'

import MoonLineIcon from '@/assets/icons/moon-line-icon.svg'
import SunLineIcon from '@/assets/icons/sun-line-icon.svg'

const INITIAL_THUMB = { x: 0, y: 0 }

export default function ThemeSwitcher() {
  const [isAnimated, setIsAnimated] = useState(false)
  const thumbControls = useAnimation()

  const animateTo = async () => {
    await Promise.all([
      thumbControls.start({
        x: '105%',
        transition: { type: 'spring', duration: 0.75 },
      }),
    ])
    setIsAnimated(true)
  }

  const animateToInitial = async () => {
    await Promise.all([
      thumbControls.start({
        ...INITIAL_THUMB,
        transition: { type: 'spring', duration: 0.75 },
      }),
    ])
    setIsAnimated(false)
  }

  return (
    <div className='relative flex h-[36px] w-[140px] items-center justify-center rounded-full bg-componentPrimary'>
      <ThemeSwitcherThumbBackdrop
        animate={thumbControls}
        initial={INITIAL_THUMB}
      />

      <ThemeSwitcherThumb>
        <SunLineIcon className='text-textPrimary' />
      </ThemeSwitcherThumb>
      <ThemeSwitcherThumb>
        <MoonLineIcon className='text-textPrimary' />
      </ThemeSwitcherThumb>

      <button
        className='absolute left-0 top-0 z-40 size-full'
        onClick={isAnimated ? animateToInitial : animateTo}
      />
    </div>
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
