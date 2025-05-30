import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

import ArrowLeftSLine from '@/assets/icons/arrow-left-s-line-icon.svg'
import Lock2FillIcon from '@/assets/icons/lock-2-fill-icon.svg'
import { Anchors } from '@/enums'
import { useThemedImage } from '@/hooks'
import { cn } from '@/theme/utils'
import { UiContainer } from '@/ui'

const solutions: { title: string; description: string }[] = [
  {
    title: 'Liveness',
    description:
      'Instantly verify that a real, live human is behind the screen',
  },
  {
    title: 'Object as keys',
    description:
      'Turn anything into a private access key - just scan, prove, and unlock with zero knowledge',
  },
  {
    title: 'Interactive watermarks',
    description:
      'Tamper-proof watermarking with tolerance to partial output modification',
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
  const seedlessRecoverySrc = useThemedImage({
    light: '/images/zkAI/seedless-recovery-light.png',
    dark: '/images/zkAI/seedless-recovery-dark.png',
  })
  const digitalLikenessSrc = useThemedImage({
    light: '/images/zkAI/digital-likeness-light.png',
    dark: '/images/zkAI/digital-likeness-dark.png',
  })

  return (
    <UiContainer
      id={Anchors.ZkImage}
      className='bg-backgroundContainer p-5 md:px-20 md:py-10 md:pt-[50px]'
      fullHeightContainerClassName='md:pt-0 md:pb-8'
      showGradientDecor
      isFullHeight={false}
      gradientDecorClassName='right-[95px] bottom-[-310px] rotate-[70deg] h-[800px] w-[600px] opacity-80 blur-[200px] bg-none gradient5'
      data-aos='fade-up'
    >
      <div className='relative'>
        <div className='flex w-full flex-col md:flex-row md:items-center md:justify-between'>
          <div className='flex flex-col gap-4'>
            <h2 className='max-w-[300px] text-textPrimary typography-h2'>
              zk-Image recognition
            </h2>
            <p className='text-textSecondary typography-subtitle3'>
              Identity building blocks that empower users
            </p>
          </div>
          <div className='mt-[20px] flex flex-col gap-[16px] md:mt-0 md:flex-row md:gap-[12px]'>
            <a
              href='https://docs.rarimo.com/zkml-bionetta/tutorial-creating-a-zkml-model/'
              target='_blank'
              className='flex h-[48px] items-center justify-center rounded-full bg-textPrimary px-[24px] text-invertedLight typography-buttonLarge'
            >
              Build in
            </a>
            <a
              target='_blank'
              className='flex h-[48px] items-center justify-center rounded-full bg-invertedLight px-[24px] text-invertedDark typography-buttonLarge'
              href='https://docs.rarimo.com/zkml-bionetta/'
            >
              Learn more: zkML Bionetta 🌿
            </a>
          </div>
        </div>

        <div className='mx-auto mt-[40px] flex flex-col gap-2'>
          <div className='flex flex-col gap-[7px] lg:flex-row'>
            <div className='relative w-full'>
              <div className='flex flex-col'>
                <div className='relative flex h-[230px] items-center justify-center rounded-t-[32px] bg-backgroundPrimary lg:h-[289px]'>
                  <img
                    className='ratio-[1.8] absolute bottom-0 max-h-[200px] lg:max-h-[227px]'
                    src={seedlessRecoverySrc}
                    alt='Seedless recovery'
                  />
                </div>
              </div>
              <div className='h-[250px] rounded-b-[32px] border border-backgroundPrimary bg-additionalOpacited px-[32px] pt-[24px] lg:h-[209px]'>
                <div className='flex flex-col gap-[8px]'>
                  <h3 className='text-textPrimary typography-h3'>
                    Seedless recovery
                  </h3>
                  <p className='text-textSecondary typography-body3 md:max-w-[365px]'>
                    No seed phrase, no cloud backup, restore access to the keys
                    autonomously using just an image
                  </p>
                </div>
                <div className='gradient5 absolute bottom-[21px] left-[30px] right-[30px] mt-[24px] rounded-[10px] p-[1px]'>
                  <div className='back flex h-full w-full items-center gap-[8px] rounded-[10px] bg-backgroundPrimary p-[12px]'>
                    <Lock2FillIcon className='center flex h-[20px] w-[20px] shrink-0 justify-center' />
                    <p className='max-w-[450px] text-textSecondary typography-body3'>
                      Generated on-device and cryptographically bound to the
                      recovery object only you know
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='relative w-full'>
              <div className='flex flex-col'>
                <div className='relative flex h-[230px] items-center justify-center rounded-t-[32px] bg-backgroundPrimary lg:h-[289px]'>
                  <img
                    className='absolute bottom-0 max-h-[200px] lg:max-h-[240px]'
                    src={digitalLikenessSrc}
                    alt='Digital likeness'
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
                    <p className='max-w-[450px] text-textSecondary typography-body3'>
                      Only a hashed vector with enforceable rules are used,
                      without raw biometrics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex flex-col'>
            <button
              className={cn(
                'mx-auto mt-[16px] flex items-center gap-[12px] md:mt-[32px]',
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <div
                className={cn(
                  'flex aspect-square h-[32px] w-[32px] rotate-[-90deg] items-center justify-center rounded-full bg-additionalOpacited transition-transform',
                  { 'rotate-[90deg]': isOpen },
                )}
              >
                <ArrowLeftSLine />
              </div>
              <p>Explore other solutions with zkML</p>
            </button>

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
