import Link from 'next/link'
import { HTMLAttributes } from 'react'

import EthIcon from '@/assets/icons/eth-icon.svg'
import { cn } from '@/theme/utils'
import { UiButton, UiContainer } from '@/ui'

export default function RegistriesSection() {
  return (
    <UiContainer
      className={cn('bg-backgroundContainer p-2')}
      isFullHeight={false}
    >
      <div
        className={cn(
          'relative flex flex-col overflow-hidden rounded-3xl bg-backgroundPure p-[72px]',
        )}
      >
        <div className='flex items-center justify-between'>
          <div className='flex flex-col gap-4'>
            <span className='text-textPrimary typography-h2'>
              Rarimo L2: ZK registries
            </span>

            <div className='flex items-center gap-2'>
              <span className='text-textSecondary typography-body2'>
                Built as
              </span>
              <div className='flex items-center gap-1'>
                <EthIcon />
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
            className={'rounded-full bg-textPrimary text-invertedLight'}
            color={'text'}
          >
            Start building
          </UiButton>
        </div>

        <div className='mt-[72px] flex gap-4'>
          <RegistryCard
            imgUrl='/images/registry-1.png'
            title={'ZK Passports'}
            desc={'90% global passport registry with uniqueness proofs'}
          />
          <RegistryCard
            imgUrl='/images/registry-2.png'
            title={'ZK Reputation'}
            desc={'Managing user leveling & permissions in privacy mode'}
          />
          <RegistryCard
            imgUrl='/images/registry-3.png'
            title={'Social accounts'}
            desc={
              'Registry of verified social handles compatible with any ZKTLS service'
            }
          />
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
    <div className='flex flex-1 flex-col items-center rounded-3xl bg-componentPrimary p-[40px] pt-4 text-center backdrop-blur-[60px]'>
      <img
        className='my-auto max-h-[250px] max-w-[250px]'
        src={imgUrl}
        alt={title}
      />
      <span className='mt-6 text-textPrimary typography-h4'>{title}</span>
      <span className='mt-2 text-textSecondary typography-body3'>{desc}</span>
    </div>
  )
}
