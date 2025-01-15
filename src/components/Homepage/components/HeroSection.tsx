'use client'

import { AnimatePresence } from 'framer-motion'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { QRCode } from 'react-qrcode-logo'
import Typed from 'typed.js'

import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import CloseFillIcon from '@/assets/icons/close-fill-icon.svg'
import RarimoIcon from '@/assets/icons/rarimo-icon.svg'
import { config } from '@/config'
import { Anchors } from '@/enums'
import { isAndroid, isIos, isMediumScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiButton, UiContainer, UiIconButton } from '@/ui'

const CLOSE_DOWNLOAD_BLOCK_ANIMATION = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
}

export default function HeroSection() {
  const typoRef = useRef<HTMLHeadingElement>(null)

  const [isQRCodeShown, setIsQRCodeShown] = useState(true)
  const isMdDown = isMediumScreen()

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
      <div className='z-10'>
        <AnimatePresence>
          {!isMdDown && isQRCodeShown && (
            <DesktopQRCodeBlock onBlockClose={() => setIsQRCodeShown(false)} />
          )}
          {isMdDown && isQRCodeShown && (
            <MobileQRCodeBlock onBlockClose={() => setIsQRCodeShown(false)} />
          )}
        </AnimatePresence>
      </div>
    </UiContainer>
  )
}

function DesktopQRCodeBlock({ onBlockClose }: { onBlockClose: () => void }) {
  return (
    <motion.div
      variants={CLOSE_DOWNLOAD_BLOCK_ANIMATION}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.3 }}
      className={cn(
        'flex flex-col gap-2',
        'rounded-2xl bg-backgroundSurface1 p-4',
        'absolute bottom-2 right-2',
        'shadow-[0px_4px_4px_0px_#0000000D,0px_2px_2px_0px_#0000000D,0px_1px_1px_0px_#0000000D,0px_0px_0px_0.33px_#0000000D]',
      )}
      data-aos='fade-up'
      data-aos-delay='400'
    >
      <UiIconButton
        className='absolute right-1 top-1'
        iconClassName='text-textSecondary hover:text-textPrimary transition duration-300'
        variant='simple'
        size='xsmall'
        onClick={onBlockClose}
      >
        <CloseFillIcon />
      </UiIconButton>
      <span className='text-center typography-caption2'>
        Download the <br /> app
      </span>
      <QRCode value={config.universityLink} size={105} />
    </motion.div>
  )
}

function MobileQRCodeBlock({ onBlockClose }: { onBlockClose: () => void }) {
  const handleDownloadLink = useCallback(() => {
    if (isIos()) {
      window.open(config.appStoreLink, '_blank')

      return
    }

    if (isAndroid()) {
      window.open(config.googlePlayLink, '_blank')

      return
    }
  }, [])

  return (
    <motion.div
      variants={CLOSE_DOWNLOAD_BLOCK_ANIMATION}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ duration: 0.3 }}
      className={cn(
        'flex justify-between',
        'rounded-2xl bg-backgroundSurface1 p-4',
        'absolute bottom-3 left-3 right-3 z-20',
        'shadow-[0px_4px_4px_0px_#0000000D,0px_2px_2px_0px_#0000000D,0px_1px_1px_0px_#0000000D,0px_0px_0px_0.33px_#0000000D]',
      )}
      data-aos='fade-up'
      data-aos-delay='400'
    >
      <UiIconButton
        className='absolute right-0.5 top-0'
        iconClassName='text-textSecondary'
        variant='simple'
        size='xsmall'
        onClick={onBlockClose}
      >
        <CloseFillIcon />
      </UiIconButton>
      <div className='flex gap-2'>
        <RarimoIcon />
        <div className='flex flex-col'>
          <span className='typography-h6'>RariMe</span>
          <span className='text-textSecondary typography-body4'>
            Go Incognito
          </span>
        </div>
      </div>
      <UiButton
        className='bg-invertedDark'
        size='small'
        onClick={handleDownloadLink}
        textClassName='text-invertedLight'
      >
        Download
      </UiButton>
    </motion.div>
  )
}
