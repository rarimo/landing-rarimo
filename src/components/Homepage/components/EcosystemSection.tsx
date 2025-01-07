'use client'

import { AnimationProps, motion, useScroll } from 'motion/react'
import { ReactElement, useRef, useState } from 'react'

import { cn } from '@/theme/utils'
import { UiContainer } from '@/ui'

const INITIAL_CARD_1 = { x: 0, y: 0, rotate: -15 }
const INITIAL_CARD_3 = { x: 0, y: 0, rotate: 15 }

const INITIAL_EXAMPLE_CARD = { x: 50, y: 50 }

export default function EcosystemSection() {
  const [isAnimated, setIsAnimated] = useState(false)

  const ref = useRef(null)

  // eslint-disable-next-line no-empty-pattern
  const {} = useScroll({
    target: ref,
    offset: ['end end', 'start start'],
  })

  const animateTo = async () => {
    setIsAnimated(true)
  }

  const animateToInitial = async () => {
    setIsAnimated(false)
  }

  return (
    <UiContainer
      ref={ref}
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-backgroundContainer',
      )}
      onClick={isAnimated ? animateToInitial : animateTo}
    >
      <div className='absolute left-1/2 top-1/2 size-[240px] -translate-x-1/2 -translate-y-1/2'>
        <EcosystemExampleCard
          animate={
            isAnimated
              ? {
                  x: 100,
                  y: -190,
                }
              : INITIAL_EXAMPLE_CARD
          }
          transition={{ duration: 0.75, type: 'spring' }}
          src={'/images/ecosystem-example.png'}
        />
        <EcosystemExampleCard
          animate={
            isAnimated
              ? {
                  x: 350,
                  y: -250,
                  scale: 0.8,
                }
              : INITIAL_EXAMPLE_CARD
          }
          transition={{
            duration: 0.75,
            type: 'spring',
          }}
          src={'/images/ecosystem-example.png'}
        />
        <EcosystemExampleCard
          animate={
            isAnimated
              ? {
                  x: 300,
                  y: -90,
                  scale: 0.8,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem-example.png'}
          transition={{
            duration: 0.75,
            type: 'spring',
          }}
        />
        <EcosystemExampleCard
          animate={
            isAnimated
              ? {
                  x: -300,
                  y: 150,
                  scale: 0.6,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem-example.png'}
          transition={{
            duration: 0.75,
            type: 'spring',
          }}
        />
        <EcosystemExampleCard
          animate={
            isAnimated
              ? {
                  x: -170,
                  y: 250,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem-example.png'}
          transition={{
            duration: 0.75,
            type: 'spring',
          }}
        />
        <EcosystemExampleCard
          animate={
            isAnimated
              ? {
                  x: 50,
                  y: 290,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem-example.png'}
          transition={{
            duration: 0.75,
            type: 'spring',
          }}
        />

        <EcosystemCard
          initial={INITIAL_CARD_1}
          transition={{ duration: 0.75, type: 'spring' }}
          animate={
            isAnimated
              ? {
                  x: 300,
                  y: 150,
                  rotate: 0,
                }
              : INITIAL_CARD_1
          }
          className={'gradient3'}
        >
          <span className='text-baseBlack typography-h2'>
            Self Issuance & Recovery
          </span>
        </EcosystemCard>
        <EcosystemCard className={'gradient1'}>
          <span className='text-baseBlack typography-h2'>
            Shared privacy layer
          </span>
        </EcosystemCard>
        <EcosystemCard
          initial={INITIAL_CARD_3}
          animate={
            isAnimated
              ? {
                  x: -300,
                  y: -150,
                  rotate: 0,
                }
              : INITIAL_CARD_3
          }
          transition={{ duration: 0.75, type: 'spring' }}
          className={'gradient4'}
        >
          <span className='text-baseWhite typography-h2'>
            Secured by Ethereum and Rarimo Layer 2
          </span>
        </EcosystemCard>
      </div>
    </UiContainer>
  )
}

function EcosystemCard({
  className,
  ...rest
}: {
  children?: ReactElement
  className?: string
} & AnimationProps) {
  return (
    <motion.div
      {...rest}
      className={cn(
        'absolute size-[240px] rounded-[40px] px-[30px] py-[40px]',
        className,
      )}
    />
  )
}

function EcosystemExampleCard({
  className,
  ...rest
}: {
  src: string
  className?: string
} & AnimationProps) {
  return (
    <motion.img
      {...rest}
      className={cn('absolute size-[140px] rounded-[20px]', className)}
    />
  )
}
