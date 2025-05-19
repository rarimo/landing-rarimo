import { useTheme } from 'next-themes'
import { useMemo } from 'react'

import Lock2FillIcon from '@/assets/icons/lock-2-fill-icon.svg'
import { Anchors, Theme } from '@/enums'
import { UiContainer } from '@/ui'

export default function ZkPassportSection() {
  const { resolvedTheme } = useTheme()

  const isDarkTheme = useMemo(
    () => resolvedTheme === Theme.Dark,
    [resolvedTheme],
  )

  const renderPrivacy = () => {
    return (
      <div className='mb-[12px] flex w-full flex-col items-center gap-[8px] lg:w-fit lg:items-start'>
        <div className='flex items-center gap-[8px]'>
          <Lock2FillIcon className='center flex h-[20px] w-[20px] justify-center' />
          <div>Privacy:</div>
        </div>
        <p className='max-w-[512px] text-textSecondary  typography-body3'>
          NFC chip scans never leave a device
          <br />
          Only zero knowledge proof is shared
        </p>
      </div>
    )
  }

  return (
    <UiContainer
      id={Anchors.ZkPassport}
      className='bg-backgroundContainer p-5 md:p-20 md:pt-[80px]'
      fullHeightContainerClassName='md:pt-0 md:pb-8'
      showGradientDecor
      isFullHeight={false}
      gradientDecorClassName='left-0 right-0 bottom-[-310px] rotate-[70deg] h-[800px] opacity-80 blur-[200px]'
      data-aos='fade-up'
    >
      <div className='relative'>
        <div className='flex flex-col justify-between  lg:flex-row'>
          <div className='flex flex-col items-stretch justify-between'>
            <div className='flex max-w-[350px] flex-col gap-[16px] md:gap-[12px]'>
              <h2 className='text-textPrimary typography-h2'>ZK Passport</h2>
              <p className='text-textSecondary typography-subtitle3'>
                Allow users to Prove who they are – without revealing any data
              </p>
              <a
                href='https://docs.rarimo.com/'
                target='_blank'
                className='mt-[20px] flex h-[48px] items-center justify-center rounded-full bg-textPrimary px-[24px] text-invertedLight md:mt-[40px] md:w-fit'
              >
                Start Integrating
              </a>
            </div>

            <div className='hidden md:block'>{renderPrivacy()}</div>
          </div>

          <div className='flex flex-col gap-[8px]'>
            <div className='mt-[40px] flex  items-center justify-center rounded-b-[8px] rounded-t-[40px] bg-additionalOpacited p-[15px] md:max-w-[565px] lg:mt-0'>
              <img
                alt='passport'
                src={
                  isDarkTheme
                    ? 'images/zkPassport/passport-dark.png'
                    : 'images/zkPassport/passport-light.png'
                }
              />
            </div>
            <div>
              <p className='mx-auto rounded-b-[40px] rounded-t-[8px] bg-additionalOpacited px-[42px] py-[42px] text-center typography-body1'>
                Supports{' '}
                <span className='italic text-primaryDarker underline underline-offset-4 typography-h4'>
                  90%
                </span>{' '}
                of global passports
              </p>
            </div>
            <div className='mt-[40px] block md:hidden'>{renderPrivacy()}</div>
          </div>
        </div>
      </div>
    </UiContainer>
  )
}
