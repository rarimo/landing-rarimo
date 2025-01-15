import Link from 'next/link'
import { useTheme } from 'next-themes'
import React, { HTMLAttributes, useRef } from 'react'
import { SwiperRef, SwiperSlide } from 'swiper/react'

import { registriesList } from '@/assets/data'
import EthIcon from '@/assets/icons/eth-icon.svg'
import { AppSwiper } from '@/common/AppSwiper'
import ClientOnly from '@/common/ClientOnly'
import { config } from '@/config'
import { Anchors, Theme } from '@/enums'
import { isLargeScreen, isMediumScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiButton, UiContainer, UiGradientDecor } from '@/ui'

export default function RegistriesSection() {
  const isMdDown = isMediumScreen()
  const isLgDown = isLargeScreen()

  const swiperRef = useRef<SwiperRef | null>(null)

  return (
    <UiContainer
      id={Anchors.ZkRegistries}
      className={cn('bg-backgroundContainer p-2')}
      isFullHeight={false}
      data-aos='fade-up'
    >
      <div
        className={cn(
          'relative flex flex-col gap-12 overflow-hidden',
          'rounded-3xl bg-backgroundPure py-10',
          'md:gap-[72px] md:py-[64px]',
        )}
      >
        <div
          className={cn(
            'flex flex-col items-start justify-between gap-5 px-6',
            'md:flex-row md:items-center md:px-16',
          )}
        >
          <div className='flex flex-col gap-4'>
            <span className='text-textPrimary typography-h3 md:typography-h2'>
              Rarimo L2: ZK registries
            </span>

            <div className='flex items-center gap-2'>
              <span className='text-textSecondary typography-body2'>
                Built as
              </span>
              <div className='flex items-center gap-1'>
                <EthIcon className='text-textPrimary' />
                <Link
                  href={config.ercLink}
                  target='_blank'
                  className='text-textPrimary underline typography-body2'
                >
                  ERC 7812
                </Link>
              </div>
            </div>
          </div>

          <UiButton
            className={cn(
              'w-full rounded-full bg-textPrimary text-invertedLight',
              'md:w-auto',
            )}
            color='text'
            size={isMdDown ? 'medium' : 'large'}
            onClick={() =>
              window.open(
                config.zkRegistriesLink,
                '_blank',
                'noopener noreferrer',
              )
            }
          >
            Start building
          </UiButton>
        </div>

        {isLgDown ? (
          <AppSwiper
            ref={swiperRef}
            slidesPerView='auto'
            slidesOffsetBefore={isMdDown ? 24 : 64}
            slidesOffsetAfter={isMdDown ? 24 : 64}
            freeMode={false}
          >
            {registriesList.map((registry, index) => (
              <SwiperSlide className='w-fit' key={index}>
                <RegistryCard {...registry} />
              </SwiperSlide>
            ))}
          </AppSwiper>
        ) : (
          <div className='flex gap-4 px-16'>
            {registriesList.map((registry, index) => (
              <RegistryCard key={index} {...registry} />
            ))}
          </div>
        )}
      </div>
    </UiContainer>
  )
}

function RegistryCard({
  lightThemeImageUrl,
  darkThemeImageUrl,
  title,
  description,
  gradientClassName,
}: {
  lightThemeImageUrl: string
  darkThemeImageUrl: string
  title: string
  description: string
  gradientClassName?: string
} & HTMLAttributes<HTMLDivElement>) {
  const { theme } = useTheme()

  const currentImageUrl =
    theme === Theme.Dark ? darkThemeImageUrl : lightThemeImageUrl

  return (
    <ClientOnly>
      {() => (
        <div
          className={cn(
            'flex flex-col items-center justify-center pb-8',
            'h-[424px] w-full min-w-[300px] max-w-min',
            'rounded-[24px] border-2 border-componentPrimary bg-backgroundContainer',
            'relative overflow-hidden',
            'md:min-w-[324px] md:max-w-min',
            'lg:min-w-0 lg:max-w-full',
          )}
        >
          <img className='z-10 my-auto' src={currentImageUrl} alt={title} />
          <div
            className={cn(
              'z-10 flex w-full max-w-[90%] flex-col gap-2 text-center',
            )}
          >
            <span className='text-textPrimary typography-h4'>{title}</span>
            <span className='text-textSecondary typography-body3'>
              {description}
            </span>
          </div>

          <UiGradientDecor gradientClassName={gradientClassName} />
        </div>
      )}
    </ClientOnly>
  )
}
