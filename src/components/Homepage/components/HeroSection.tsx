'use client'

import Link from 'next/link'
import { useCallback, useState } from 'react'
import { QRCode } from 'react-qrcode-logo'

import AppleIcon from '@/assets/icons/apple-icon.svg'
import ArrowsIcon from '@/assets/icons/arrows-icon.svg'
import CarretDownIcon from '@/assets/icons/caret-down-icon.svg'
import DeviceIcon from '@/assets/icons/device-icon.svg'
import RiGooglePlayFillIcon from '@/assets/icons/ri-google-play-fill-icon.svg'
import { Config } from '@/config'
import { Anchors } from '@/enums'
import { isAndroid, isIos, isMobile } from '@/helpers/device'
import { useTranslation } from '@/hooks/useTranslation'
import { cn } from '@/theme/utils'
import { Button, Container, Divider, UiCollapse } from '@/ui'

export default function HeroSection() {
  const { t } = useTranslation()

  const [isQrCodeDropdownShown, setIsQrCodeDropdownShown] = useState(false)

  const handleActivateClick = useCallback(() => {
    if (isIos()) {
      window.open(Config.appStoreLink, '_blank')

      return
    }

    if (isAndroid()) {
      window.open(Config.googlePlayLink, '_blank')

      return
    }

    setIsQrCodeDropdownShown(prev => !prev)
  }, [])

  return (
    <Container className='flex flex-col items-center justify-between pt-0 lg:flex-row lg:pt-12'>
      <div
        className='z-10 mx-auto flex flex-col items-center text-center lg:mx-0 lg:items-start lg:text-left'
        data-aos='fade-up'
      >
        <h1 className='flex flex-col text-h2 text-primaryMain'>
          {t('hero-section.title')}
        </h1>
        <p className='mt-4 whitespace-pre-line text-h4 text-textPrimary'>
          {t('hero-section.subtitle')}
        </p>

        <div className='relative mt-8 flex flex-row items-center gap-6 lg:gap-4'>
          <Button
            className='min-h-[56px] min-w-[250] gap-4 bg-primaryMain text-baseWhite'
            onClick={handleActivateClick}
          >
            {isMobile() ? (
              <>
                <span className='text-button-medium uppercase'>
                  {t('hero-section.activate-btn')}
                </span>
                <Divider
                  direction={'vertical'}
                  className={'h-[24px] bg-white opacity-[0.1]'}
                />
                <div className='flex flex-row items-center gap-2'>
                  <>
                    {isIos() ? (
                      <div className='size-[20]'>
                        <AppleIcon />
                      </div>
                    ) : (
                      <div className='size-[20]'>
                        <RiGooglePlayFillIcon />
                      </div>
                    )}
                  </>
                </div>
              </>
            ) : (
              <div className='flex flex-row items-center gap-3'>
                <div className='size-[20px]'>
                  <DeviceIcon />
                </div>

                <span className='mr-1 text-button-medium uppercase'>
                  {t('hero-section.activate-btn')}
                </span>

                <Divider
                  direction={'vertical'}
                  className={'h-[24px] bg-white opacity-[0.1]'}
                />

                <div
                  className={cn(
                    'flex size-[20px] items-center justify-center transition-transform duration-300 ease-in-out',
                    isQrCodeDropdownShown && 'rotate-180',
                  )}
                >
                  <CarretDownIcon />
                </div>
              </div>
            )}
          </Button>

          <div
            className={cn(
              'absolute left-1/2 top-[120%] z-10 -translate-x-1/2',
              'lg:left-0 lg:translate-x-0',
            )}
          >
            <UiCollapse isOpen={isQrCodeDropdownShown}>
              <div className='flex flex-row items-center gap-4 rounded-sm bg-baseWhite p-4'>
                <div className='rounded-sm border border-componentPrimary'>
                  <QRCode
                    value={Config.universalLink}
                    size={175}
                    style={{ borderRadius: '12px' }}
                    logoPadding={4}
                    logoImage={`/images/logo-symbol-icon.svg`}
                  />
                </div>

                <div className='flex flex-col items-center gap-6 lg:gap-4'>
                  <a
                    className={cn(
                      'w-full items-center justify-center transition-transform',
                      'hover:scale-110',
                      'min-w-[110px]',
                    )}
                    href={Config.appStoreLink}
                    target='_blank'
                  >
                    <img className='' src='/images/app-store.svg' alt='Hero' />
                  </a>
                  <a
                    className={cn(
                      'w-full items-center justify-center transition-transform',
                      'hover:scale-110',
                      'min-w-[110px]',
                    )}
                    href={Config.googlePlayLink}
                    target='_blank'
                  >
                    <img className='' src='/images/g-play.svg' alt='Hero' />
                  </a>
                </div>
              </div>
            </UiCollapse>
          </div>
        </div>

        <Link
          href={`#${Anchors.Description}`}
          className='mt-[190px] hidden flex-row items-center gap-3 lg:flex'
          data-aos='fade-up'
          data-aos-delay='350'
        >
          <div className='animate-bounce text-primaryMain'>
            <ArrowsIcon className='text-textPrimary' />
          </div>
          <span className='text-body4 whitespace-nowrap text-textSecondary'>
            {t('hero-section.view-more-btn')}
          </span>
        </Link>
      </div>
      <img
        className='mt-12 block w-[570px] lg:-mr-2 lg:-mt-16'
        src={t('hero-section.image-path')}
        alt='Hero'
        data-aos='fade-up'
        data-aos-delay='300'
      />
    </Container>
  )
}
