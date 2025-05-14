import ArrowLeftSLine from '@/assets/icons/arrow-left-s-line-icon.svg'
import Lock2FillIcon from '@/assets/icons/lock-2-fill-icon.svg'
import MoneyDollarCircleLine from '@/assets/icons/money-dollar-circle-line.svg'
import { Anchors } from '@/enums'
import { UiContainer, UiIconButton } from '@/ui'

export default function ZkAISection() {
  return (
    <UiContainer
      id={Anchors.ZkAI}
      className='bg-backgroundContainer p-10 md:pt-[40px]'
      fullHeightContainerClassName='md:pt-0 md:pb-8'
      showGradientDecor
      isFullHeight={false}
      gradientDecorClassName='right-[95px] bottom-[-310px] rotate-[70deg] h-[800px] w-[600px] opacity-80 blur-[200px] bg-none gradient5'
      data-aos='fade-up'
    >
      <div className='relative'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-textPrimary typography-h3 md:typography-h2'>
              zkAI
            </h2>
            <p className='text-textSecondary typography-subtitle3'>
              Tools for the AI models
            </p>
          </div>
          <div className='flex gap-3'>
            <a
              href='https://docs.rarimo.com/'
              target='_blank'
              className='flex h-[48px] items-center rounded-full bg-textPrimary px-[24px] text-invertedLight'
            >
              Start Integrating
            </a>
            <a
              target='_blank'
              className='flex h-[48px] items-center rounded-full bg-invertedLight px-[24px] text-invertedDark'
              href='https://rarimo.com/learning-hub/bionetta-ultimate-client-side-zkml-technical-overview-62'
            >
              Learn more: zkML Bionetta 🌿
            </a>
          </div>
        </div>

        <div className='mx-auto mt-[40px] flex flex-col gap-2'>
          <div className='flex w-full gap-2'>
            <div className='relative min-h-[321px] flex-1 rounded-[8px] rounded-tr-[40px] bg-additionalOpacited md:p-8'>
              <img
                src='images/zkAI/watermarking.png'
                className='absolute right-[30px] top-[45px] aspect-[1.13] max-w-[200px] object-cover object-left'
                alt='watermarking'
              />
              <div className='absolute bottom-[32px] left-[32px] flex max-w-[274px] flex-col gap-2'>
                <h3 className='text-textPrimary typography-h3'>Watermarking</h3>
                <p className='text-textSecondary typography-body3'>
                  Tamper-resistant watermarking with tolerance to partial output
                  modification
                </p>
              </div>
            </div>
            <div className='relative min-h-[321px] flex-1 rounded-[8px] rounded-tl-[40px] bg-additionalOpacited md:p-8'>
              <img
                src='images/zkAI/digital-likeness.png'
                className='absolute right-0 top-[10px] aspect-[0.93] max-w-[290px]'
                alt='watermarking'
              />
              <div className='absolute right-[270px] top-[54px] flex max-w-[246px] flex-col gap-2'>
                <MoneyDollarCircleLine className='absolute right-[-20px] top-[-30px] h-[30px] w-[30px]' />
                <h3 className='text-textPrimary typography-h3'>Licencing</h3>
                <p className='text-textSecondary typography-body3'>
                  Users can opt into <br /> licensing terms
                </p>
              </div>
              <div className='absolute bottom-[32px] left-[32px] flex max-w-[246px] flex-col gap-2'>
                <h3 className='text-textPrimary typography-h3'>
                  Digital likeness
                </h3>
                <p className='text-textSecondary typography-body3'>
                  Let users decide if, when, and how their face can be used
                </p>
              </div>
            </div>
          </div>

          <div className='flex-1 items-center justify-center rounded-[8px] rounded-b-[40px] bg-additionalOpacited px-[15px] py-[30px]'>
            <div className='mx-auto flex w-fit items-center gap-[8px]'>
              <div className='flex items-center gap-[8px]'>
                <Lock2FillIcon className='center flex h-[20px] w-[20px] justify-center' />
                <div>Privacy:</div>
              </div>
              <p className='max-w-[512px] text-textSecondary  typography-body3'>
                External parties can’t generate valid watermarks tied to your
                model <br /> Only a hashed vector with enforceable rules is
                stored, without raw biometrics
              </p>
            </div>
          </div>

          <div className='mx-auto mt-[25px] flex items-center gap-[12px]'>
            <UiIconButton
              className='aspect-square h-[32px] w-[32px] rotate-[-90deg] bg-additionalOpacited'
              size='large'
              color='white'
            >
              <ArrowLeftSLine />
            </UiIconButton>
            <p>Explore other solutions with zkML</p>
          </div>
        </div>
      </div>
    </UiContainer>
  )
}
