import Link from 'next/link'
import { HTMLAttributes } from 'react'

import EthIcon from '@/assets/icons/eth-icon.svg'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'
import { UiButton, UiContainer } from '@/ui'

export default function RegistriesSection() {
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
            // TODO: mobile - size medium
          >
            Start building
          </UiButton>
        </div>
        <div
          className={cn(
            'relative mt-12 min-h-[424px] overflow-x-auto md:mt-[72px]',
          )}
        >
          <div className='absolute flex h-full gap-4'>
            <RegistryCard
              imgUrl='/images/registry-1.svg'
              title={'ZK Passports'}
              desc={'90% global passport registry with uniqueness proofs'}
            />
            <RegistryCard
              imgUrl='/images/registry-2.svg'
              title={'ZK Reputation'}
              desc={'Managing user leveling & permissions in privacy mode'}
            />
            <RegistryCard
              imgUrl='/images/registry-3.svg'
              title={'Social accounts'}
              desc={
                'Registry of verified social handles compatible with any ZKTLS service'
              }
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
}: {
  imgUrl: string
  title: string
  desc: string
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className='flex w-full min-w-[300px] max-w-full flex-col items-center gap-[60px] overflow-hidden rounded-3xl border border-componentPrimary bg-backgroundContainer p-10 pt-4 text-center backdrop-blur-[24px]'>
      <img className='my-auto' src={imgUrl} alt={title} />
      <div className='flex flex-col gap-2'>
        <span className='text-textPrimary typography-h4'>{title}</span>
        <span className='text-textSecondary typography-body3'>{desc}</span>
      </div>
    </div>
  )
}
