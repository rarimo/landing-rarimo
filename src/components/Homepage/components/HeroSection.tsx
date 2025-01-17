'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import { config } from '@/config'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'
import { UiContainer } from '@/ui'

export default function HeroSection() {
  const typoRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!typoRef.current) return

    const typed = new Typed(typoRef.current, {
      strings: ['Device', 'Identity'],
      typeSpeed: 120,
      backSpeed: 80,
      loop: true,
      startDelay: 1000,
      backDelay: 800,
      autoInsertCss: true,
      cursorChar: ' ',
    })

    return () => typed.destroy()
  }, [])

  return (
    <UiContainer
      id={Anchors.Home}
      className={cn(
        'flex flex-col items-center bg-backgroundContainer pb-[132px]',
        'items-start justify-end',
        'relative overflow-hidden',
        'md:p-[72px]',
      )}
      showGradientDecor
      gradientDecorClassName={cn(
        '-right-[65px] -top-[83px] -rotate-[10deg] h-[570px] w-[680px]',
      )}
      fullHeightContainerClassName={cn('h-[calc(100vh-68px)]')}
      data-aos='fade-up'
    >
      <div
        className={cn(
          'z-10 flex flex-col items-center gap-8 self-center text-center',
          'md:items-start md:self-start md:text-left',
        )}
      >
        <Link
          href={config.heroSectionLink}
          target='_blank'
          className={cn(
            'flex items-center gap-2 self-center rounded-full bg-backgroundSurface1 px-3 py-2',
            'md:self-start',
            'transition duration-300',
            'hover:bg-componentPrimary',
          )}
        >
          <span className='text-textPrimary typography-caption1'>
            Rarimo raised $2.5m
          </span>
          <div className='h-[70%] w-[1px] bg-componentPrimary' />
          <ArrowRightSLineIcon />
        </Link>
        <h1 className='h-[174px] md:h-[256px]'>
          <span
            className={cn(
              'text-textPrimary typography-display4',
              'md:typography-display2',
            )}
          >
            Your
          </span>
          <br />
          <span
            className={cn(
              'gradient1 bg-clip-text text-transparent typography-display3',
              'md:typography-display1',
            )}
            ref={typoRef}
          ></span>
        </h1>
      </div>
    </UiContainer>
  )
}
