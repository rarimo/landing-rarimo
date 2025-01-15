import Link from 'next/link'
import { useTheme } from 'next-themes'
import { HTMLAttributes } from 'react'

import EthIcon from '@/assets/icons/eth-icon.svg'
import ClientOnly from '@/common/ClientOnly'
import { Config } from '@/config'
import { Anchors, Theme } from '@/enums'
import { isMediumScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiButton, UiContainer, UiGradientDecor } from '@/ui'

export default function RegistriesSection() {
  const isMdDown = isMediumScreen()

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
                  href={Config.ercLink}
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
            color={'text'}
            size={isMdDown ? 'medium' : 'large'}
            onClick={() =>
              window.open(
                Config.zkRegistriesLink,
                '_blank',
                'noopener noreferrer',
              )
            }
          >
            Start building
          </UiButton>
        </div>

        <div
          className={cn(
            'hide-scrollbar flex gap-4  overflow-x-scroll px-6',
            'md:px-16',
            'lg:overflow-x-hidden',
          )}
        >
          <RegistryCard
            lightThemeImageUrl='/images/registries/registry-1-light.svg'
            darkThemeImageUrl='/images/registries/registry-1-dark.svg'
            title={'ZK Passports'}
            description={'90% global passport registry with uniqueness proofs'}
            gradientClassName={cn('-bottom-[320px] left-0 h-[414px] w-[991px]')}
          />
          <RegistryCard
            lightThemeImageUrl='/images/registries/registry-2-light.svg'
            darkThemeImageUrl='/images/registries/registry-2-dark.svg'
            title={'ZK Reputation'}
            description={'Managing user leveling & permissions in privacy mode'}
            gradientClassName={cn(
              '-bottom-[320px] -left-[331px] h-[414px] w-[991px]',
            )}
          />
          <RegistryCard
            lightThemeImageUrl='/images/registries/registry-3-light.svg'
            darkThemeImageUrl='/images/registries/registry-3-dark.svg'
            title={'Social accounts'}
            description={
              'Registry of verified social handles compatible with any ZKTLS service'
            }
            gradientClassName={cn(
              '-bottom-[320px] -left-[662px] h-[414px] w-[991px] mix',
            )}
          />
        </div>
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
            'flex flex-col justify-center px-10 pb-10',
            'h-[424px] w-full min-w-[300px]',
            'rounded-[24px] border-2 border-componentPrimary bg-backgroundContainer',
            'relative overflow-hidden',
          )}
        >
          <img
            className='z-10 mx-auto my-auto'
            src={currentImageUrl}
            alt={title}
          />
          <div className='z-10 flex flex-col gap-2 text-center'>
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
