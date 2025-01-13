'use client'

import Link from 'next/link'
import { HTMLAttributes, useEffect, useRef, useState } from 'react'

import EthIcon from '@/assets/icons/eth-icon.svg'
import { Anchors } from '@/enums'
import { isMediumScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiButton, UiContainer, UiGradientDecor } from '@/ui'

export default function RegistriesSection() {
  const isMdDown = isMediumScreen()

  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(1000)

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth)
    }
  }, [])

  return (
    <UiContainer
      id={Anchors.ZkRegistries}
      className={cn('bg-backgroundContainer p-2')}
      isFullHeight={false}
    >
      <div
        className={cn(
          'relative flex flex-col overflow-hidden rounded-3xl bg-backgroundPure px-6 py-10 md:px-[64px] md:py-[64px]',
        )}
      >
        <div
          className={cn(
            'flex flex-col items-start justify-between gap-5',
            'md:flex-row md:items-center',
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
                  href={'#'}
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
          >
            Start building
          </UiButton>
        </div>
        <div
          ref={containerRef}
          className={cn(
            'relative mt-12 min-h-[424px] overflow-x-auto md:mt-[72px]',
          )}
        >
          <div className='absolute flex h-full gap-4'>
            <RegistryCard
              imgUrl='/images/registry-1.svg'
              title={'ZK Passports'}
              desc={'90% global passport registry with uniqueness proofs'}
              gradientClassName={cn(
                '-bottom-[320px] left-0 h-[414px]',
                `w-[${containerWidth}px]`,
              )}
            />
            <RegistryCard
              imgUrl='/images/registry-2.svg'
              title={'ZK Reputation'}
              desc={'Managing user leveling & permissions in privacy mode'}
              gradientClassName={cn(
                '-bottom-[320px] -left-[331px] h-[414px]',
                `w-[${containerWidth}px]`,
              )}
            />
            <RegistryCard
              imgUrl='/images/registry-3.svg'
              title={'Social accounts'}
              desc={
                'Registry of verified social handles compatible with any ZKTLS service'
              }
              gradientClassName={cn(
                '-bottom-[320px] -left-[331px] h-[414px]',
                `w-[${containerWidth}px]`,
              )}
            />
          </div>
        </div>
      </div>
    </UiContainer>
  )
}

function RegistryCard({
  imgUrl,
  title,
  desc,
  gradientClassName,
}: {
  imgUrl: string
  title: string
  desc: string
  gradientClassName?: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center',
        'h-424 h-full w-full min-w-[300px]',
        'rounded-[24px] border-2 border-componentPrimary',
        'px-10 pb-10',
        'relative overflow-hidden',
      )}
    >
      <img className='z-10 mx-auto my-auto' src={imgUrl} alt={title} />
      <div className='z-10 flex flex-col gap-2 text-center'>
        <span className='text-textPrimary typography-h4'>{title}</span>
        <span className='text-textSecondary typography-body3'>{desc}</span>
      </div>

      <UiGradientDecor gradientClassName={gradientClassName} />
    </div>
  )
}
