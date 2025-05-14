import Lock2FillIcon from '@/assets/icons/lock-2-fill-icon.svg'
import { Anchors } from '@/enums'
import { UiContainer } from '@/ui'

export default function ZkPassportSection() {
  return (
    <UiContainer
      id={Anchors.ZkPassport}
      className='bg-backgroundContainer p-20 md:pt-[80px]'
      fullHeightContainerClassName='md:pt-0 md:pb-8'
      showGradientDecor
      isFullHeight={false}
      gradientDecorClassName='left-0 right-0 bottom-[-310px] rotate-[70deg] h-[800px] opacity-80 blur-[200px]'
      data-aos='fade-up'
    >
      <div className='relative'>
        <div className='flex justify-between'>
          <div className='flex flex-col items-stretch justify-between'>
            <div className='flex max-w-[350px] flex-col gap-4'>
              <h2 className='text-textPrimary typography-h3 md:typography-h2'>
                ZK Passport
              </h2>
              <p className='text-textSecondary typography-subtitle3'>
                Allow users to Prove who they are – without revealing any data
              </p>
              <a
                href='https://docs.rarimo.com/'
                target='_blank'
                className='mt-[40px] flex h-[48px] w-fit items-center rounded-full bg-textPrimary px-[24px] text-invertedLight'
              >
                Start Integrating
              </a>
            </div>

            <div className='mb-[12px] flex w-fit flex-col gap-[8px]'>
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
          </div>

          <div className='flex flex-col gap-[8px]'>
            <div className='relative flex items-center justify-center rounded-b-[8px] rounded-t-[40px] bg-additionalOpacited px-[40px] py-[26px] md:min-w-[565px]'>
              <img
                alt='passport'
                className='z-10 aspect-[0.6] max-w-[236px]'
                src='images/zkPassport/passport.png'
              />
              <div className='absolute flex w-full flex-col items-center gap-[70px]'>
                <div className='flex w-[87%] gap-[15px]'>
                  <p className='text-textPlaceholder'>Citizenship</p>
                  <div className='h-[30px] w-full justify-between bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.05),rgba(0,0,0,0.05)_5px,transparent_5px,transparent_10px)]'></div>
                  <p className='text-textPlaceholder'>Uniqueness</p>
                </div>
                <div className='flex w-[67%] gap-[15px]'>
                  <p className='text-textPlaceholder'>Name</p>
                  <div className='h-[30px] w-full justify-between bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.05),rgba(0,0,0,0.05)_5px,transparent_5px,transparent_10px)]'></div>
                  <p className='text-textPlaceholder'>Age</p>
                </div>
              </div>
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
          </div>
        </div>
      </div>
    </UiContainer>
  )
}
