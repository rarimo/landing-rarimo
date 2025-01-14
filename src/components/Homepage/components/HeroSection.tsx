'use client'

import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import { QRCode } from 'react-qrcode-logo'
import Typed from 'typed.js'

import ArrowRightSLineIcon from '@/assets/icons/arrow-right-s-line-icon.svg'
import CloseFillIcon from '@/assets/icons/close-fill-icon.svg'
import RarimoIcon from '@/assets/icons/rarimo-icon.svg'
import { Config } from '@/config'
import { Anchors } from '@/enums'
import { isAndroid, isIos, isMediumScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiButton, UiContainer, UiGradientDecor, UiIconButton } from '@/ui'

export default function HeroSection() {
  const typoRef = useRef<HTMLHeadingElement>(null)

  const [isQRCodeShown, setIsQRCodeShown] = useState(true)
  const isMdDown = isMediumScreen()

  useEffect(() => {
    if (!typoRef.current) return

    const typed = new Typed(typoRef.current, {
      strings: ['Device', 'Identity'],
      typeSpeed: 180,
      backSpeed: 120,
      loop: true,
      startDelay: 1200,
      backDelay: 1000,
      autoInsertCss: true,
      cursorChar: ' ',
    })

    return () => typed.destroy()
  }, [])

  return (
    <UiContainer
      id={Anchors.Home}
      className={cn(
        'flex flex-col items-center bg-backgroundContainer pb-[132px] md:p-[72px]',
        'items-start justify-end',
        'relative overflow-hidden',
      )}
    >
      <UiGradientDecor gradientClassName='-right-[65px] -top-[83px] -rotate-[10deg] h-[570px] w-[680px]' />
      <div
        className={cn(
          'flex flex-col items-center gap-8 self-center text-center',
          'md:items-start md:self-start md:text-left',
          'z-10',
        )}
      >
        <Link
          href={Config.heroSectionLink}
          target='_blank'
          className={cn(
            'flex items-center gap-2 self-center rounded-full bg-backgroundSurface1 px-3 py-2',
            'md:self-start',
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
          <span className='text-textPrimary typography-display4 md:typography-display2'>
            Your
          </span>
          <br />
          <span
            className='gradient1 bg-clip-text text-transparent typography-display3 md:typography-display1'
            ref={typoRef}
          ></span>
        </h1>
      </div>
      <div className='z-10'>
        {!isMdDown && isQRCodeShown && (
          <DesktopQRCodeBlock onBlockClose={() => setIsQRCodeShown(false)} />
        )}
        {isMdDown && isQRCodeShown && (
          <MobileQRCodeBlock onBlockClose={() => setIsQRCodeShown(false)} />
        )}
      </div>
    </UiContainer>
  )
}

function DesktopQRCodeBlock({ onBlockClose }: { onBlockClose: () => void }) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        'rounded-2xl bg-backgroundSurface1 p-4',
        'absolute bottom-2 right-2',
        'shadow-[0px_4px_4px_0px_#0000000D,0px_2px_2px_0px_#0000000D,0px_1px_1px_0px_#0000000D,0px_0px_0px_0.33px_#0000000D]',
      )}
    >
      <UiIconButton
        className='absolute right-1 top-1'
        iconClassName='text-textSecondary'
        variant='simple'
        size='xsmall'
        onClick={onBlockClose}
      >
        <CloseFillIcon />
      </UiIconButton>
      <span className='text-center typography-caption2'>
        Download the <br /> app
      </span>
      <QRCode value={Config.universityLink} size={105} />
    </div>
  )
}

function MobileQRCodeBlock({ onBlockClose }: { onBlockClose: () => void }) {
  const handleDownloadLink = useCallback(() => {
    if (isIos()) {
      window.open(Config.appStoreLink, '_blank')

      return
    }

    if (isAndroid()) {
      window.open(Config.googlePlayLink, '_blank')

      return
    }
  }, [])

  return (
    <div
      className={cn(
        'flex justify-between',
        'rounded-2xl bg-backgroundSurface1 p-4',
        'absolute bottom-3 left-3 right-3 z-20',
        'shadow-[0px_4px_4px_0px_#0000000D,0px_2px_2px_0px_#0000000D,0px_1px_1px_0px_#0000000D,0px_0px_0px_0.33px_#0000000D]',
      )}
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
    </div>
  )
}
