import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import ArrowLeftSLine from '@/assets/icons/arrow-left-s-line-icon.svg'
import Lock2FillIcon from '@/assets/icons/lock-2-fill-icon.svg'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'
import { UiContainer, UiIconButton } from '@/ui'

const solutions: { title: string; description: string }[] = [
  {
    title: 'Liveness',
    description:
      'Instantly verify that a real, live human is behind the screen',
  },
  {
    title: 'Account recovery',
    description:
      'No seed phrase, no cloud backup, restore access to a wallet using zk registries',
  },
  {
    title: 'Objects as keys',
    description:
      'Turn anything into a private access key - just scan, prove, and unlock with zero knowledge',
  },
]

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      ease: 'easeOut',
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: 10,
    transition: {
      delay: (solutions.length - i - 1) * 0.1,
      duration: 0.2,
      ease: 'easeIn',
    },
  }),
}

const wrapperVariants = {
  hidden: { height: 0, opacity: 0, marginTop: 0 },
  visible: {
    height: 'auto',
    marginTop: 30,
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.05,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    marginTop: 0,
    transition: { when: 'afterChildren' },
  },
}

export default function ZkAISection() {
  const [isOpen, setIsOpen] = useState(false)
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
        <div className='flex w-full flex-col md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-col gap-4'>
            <h2 className='text-textPrimary typography-h2'>zkAI</h2>
            <p className='text-textSecondary typography-subtitle3'>
              Tools for the AI models
            </p>
          </div>
          <div className='mt-[20px] flex flex-col gap-[16px] md:mt-0 md:flex-row md:gap-[12px]'>
            <a
              href='https://docs.rarimo.com/'
              target='_blank'
              className='flex h-[48px] items-center justify-center rounded-full bg-textPrimary px-[24px] text-invertedLight'
            >
              Start Integrating
            </a>
            <a
              target='_blank'
              className='flex h-[48px] items-center justify-center rounded-full bg-invertedLight px-[24px] text-invertedDark'
              href='https://rarimo.com/learning-hub/bionetta-ultimate-client-side-zkml-technical-overview-62'
            >
              Learn more: zkML Bionetta 🌿
            </a>
          </div>
        </div>

        <div className='mx-auto mt-[40px] flex flex-col gap-2'>
          <div className='flex flex-col gap-[7px] lg:flex-row'>
            <div className='relative w-full'>
              <div className='flex flex-col'>
                <div className='flex h-[230px] items-center justify-center rounded-t-[32px] bg-backgroundPrimary lg:h-[289px]'>
                  <img
                    className='ratio-[1.8] max-h-[164px]'
                    src='images/zkAi/watermarking.png'
                    alt='Interactive watermarks'
                  />
                </div>
              </div>
              <div className='h-[230px] rounded-b-[32px] border border-backgroundPrimary bg-additionalOpacited px-[32px] pt-[24px] lg:h-[209px]'>
                <div className='flex flex-col gap-[8px]'>
                  <h3 className='text-textPrimary typography-h3'>
                    Interactive watermarks
                  </h3>
                  <p className='max-w-[274px] text-textSecondary typography-body3'>
                    Tamper-proof watermarking with tolerance to partial output
                    modification
                  </p>
                </div>
                <div className='gradient5 absolute bottom-[21px] left-[30px] right-[30px] mt-[24px] rounded-[10px] p-[1px]'>
                  <div className='back flex h-full w-full items-center gap-[8px] rounded-[10px] bg-backgroundPrimary p-[12px]'>
                    <Lock2FillIcon className='center flex h-[20px] w-[20px] shrink-0 justify-center' />
                    <p className='text-textSecondary typography-body3'>
                      Cryptographically tied to your model and prompt, making it
                      impossible to forge
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='relative w-full'>
              <div className='flex flex-col'>
                <div className='relative flex h-[230px] items-center justify-center rounded-t-[32px] bg-backgroundPrimary lg:h-[289px]'>
                  <img
                    className='ratio-[1.8] absolute bottom-0 max-h-[200px] lg:max-h-[240px]'
                    src='images/zkAi/digital-likeness.png'
                    alt='Interactive watermarks'
                  />
                </div>
              </div>
              <div className='h-[230px] rounded-b-[32px] border border-backgroundPrimary bg-additionalOpacited px-[32px] pt-[24px] lg:h-[209px]'>
                <div className='flex flex-col gap-[8px]'>
                  <h3 className='text-textPrimary typography-h3'>
                    Digital likeness
                  </h3>
                  <p className='max-w-[274px] text-textSecondary typography-body3'>
                    Let users decide if, when, and how their face can be used
                  </p>
                </div>
                <div className='gradient5 absolute bottom-[21px] left-[30px] right-[30px] mt-[24px] rounded-[10px] p-[1px]'>
                  <div className='back flex h-full w-full items-center gap-[8px] rounded-[10px] bg-backgroundPrimary p-[12px]'>
                    <Lock2FillIcon className='center flex h-[20px] w-[20px] shrink-0 justify-center' />
                    <p className='text-textSecondary typography-body3'>
                      Only a hashed vector with enforceable rules are used,
                      without raw biometrics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <div
              className={cn('mx-auto mt-[32px] flex items-center gap-[12px]')}
            >
              <UiIconButton
                className={cn(
                  'aspect-square h-[32px] w-[32px] rotate-[-90deg] bg-additionalOpacited transition-transform',
                  { 'rotate-[90deg]': isOpen },
                )}
                size='large'
                color='white'
                onClick={() => setIsOpen(prev => !prev)}
              >
                <ArrowLeftSLine />
              </UiIconButton>
              <p>Explore other solutions with zkML</p>
            </div>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  variants={wrapperVariants}
                  initial='hidden'
                  animate='visible'
                  exit='exit'
                  className='grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-[16px] overflow-hidden'
                >
                  {solutions.map(({ title, description }, index) => (
                    <motion.div
                      key={index}
                      custom={index}
                      variants={itemVariants}
                      className='flex flex-col gap-[8px] rounded-[24px] bg-additionalOpacited p-[24px]'
                    >
                      <h5 className='typography-h5'>{title}</h5>
                      <p className='text-textSecondary typography-body4'>
                        {description}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </UiContainer>
  )
}
