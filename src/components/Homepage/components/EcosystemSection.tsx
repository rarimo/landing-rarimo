'use client'

import { AnimationProps, motion, Transition } from 'motion/react'
import { ReactElement, useState } from 'react'

import { IntersectionAnchor } from '@/common'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'
import { UiContainer } from '@/ui'

const INITIAL_CARD_1 = { x: 0, y: 0, rotate: -15 }
const INITIAL_CARD_3 = { x: 0, y: 0, rotate: 15 }

const INITIAL_EXAMPLE_CARD = { x: 50, y: 50 }

export default function EcosystemSection() {
  const [isAnimated, setIsAnimated] = useState(false)

  // TODO: add mobile adaptation

  return (
    <UiContainer
      id={Anchors.Ecosystem}
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-backgroundContainer',
      )}
    >
      <div className='absolute left-1/2 top-1/2 size-[240px] -translate-x-1/2 -translate-y-1/2'>
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: 100,
                  y: -200,
                  scale: 0.98,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem/ecosystem-2.png'}
        />
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: 380,
                  y: -250,
                  scale: 0.74,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem/ecosystem-1.png'}
        />
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: 330,
                  y: -35,
                  scale: 0.72,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem/ecosystem-3.png'}
        />
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: -390,
                  y: 150,
                  scale: 0.61,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem/ecosystem-4.png'}
        />
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: -220,
                  y: 205,
                  scale: 0.99,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem/ecosystem-5.png'}
        />
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: 10,
                  y: 320,
                  scale: 0.72,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem/ecosystem-6.png'}
        />

        <EcosystemStackCard
          initial={INITIAL_CARD_1}
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
          <span
            className={cn(
              'text-baseBlack opacity-80 typography-h4',
              'md:typography-h2',
            )}
          >
            Self Issuance & Recovery
          </span>
        </EcosystemStackCard>
        <EcosystemStackCard className={'gradient1'}>
          <span
            className={cn(
              'text-baseBlack opacity-80 typography-h4',
              'md:typography-h2',
            )}
          >
            Shared privacy layer
          </span>
        </EcosystemStackCard>
        <EcosystemStackCard
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
          className={'gradient4'}
        >
          <span
            className={cn(
              'text-baseWhite opacity-80 typography-h4',
              'md:typography-h2',
            )}
          >
            Secured by Ethereum and Rarimo Layer 2
          </span>
        </EcosystemStackCard>
      </div>
      <IntersectionAnchor
        enterThreshold={0.9}
        exitThreshold={0.3}
        onIntersect={() => setIsAnimated(true)}
        onExit={() => setIsAnimated(false)}
      />
    </UiContainer>
  )
}

function EcosystemStackCard({
  className,
  transition = { duration: 1.2, type: 'spring' },
  ...rest
}: {
  children?: ReactElement
  className?: string
  transition?: Transition
} & AnimationProps) {
  return (
    <motion.div
      {...rest}
      transition={transition}
      className={cn(
        'absolute rounded-[40px] px-[30px] py-[40px] sm:size-[164px] md:size-[240px]',
        className,
      )}
    />
  )
}

function EcosystemImageCard({
  className,
  transition = { duration: 1.2, type: 'spring' },
  ...rest
}: {
  src: string
  className?: string
  transition?: Transition
} & AnimationProps) {
  return (
    <motion.img
      {...rest}
      transition={transition}
      className={cn('absolute size-[140px] rounded-[20px]', className)}
    />
  )
}
