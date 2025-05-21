'use client'

import { AnimationProps, motion, Transition } from 'motion/react'
import { ReactElement, useState } from 'react'

import IntersectionAnchor from '@/common/IntersectionAnchor'
import { Anchors } from '@/enums'
import { isLargeScreen } from '@/helpers'
import { cn } from '@/theme/utils'
import { UiContainer } from '@/ui'

const INITIAL_CARD_1 = { x: 0, y: 0, rotate: -15 }
const INITIAL_CARD_3 = { x: 0, y: 0, rotate: 15 }

const INITIAL_EXAMPLE_CARD = { x: 50, y: 50, hidden: true }

export default function EcosystemSection() {
  const [isAnimated, setIsAnimated] = useState(true)
  const isLgDown = isLargeScreen()

  return (
    <UiContainer
      id={Anchors.Ecosystem}
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-backgroundContainer pt-0',
      )}
      fullHeightContainerClassName='md:pt-0 md:pb-4'
    >
      <div
        className={cn(
          'absolute left-1/2 top-1/2 size-[172px] -translate-x-1/2 -translate-y-1/2',
          'lg:size-[240px]',
        )}
      >
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: isLgDown ? 145 : 380,
                  y: isLgDown ? -85 : -250,
                  scale: isLgDown ? 0.74 : 0.74,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem/ecosystem-1.png'}
        />
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: isLgDown ? 110 : 100,
                  y: isLgDown ? -170 : -200,
                  scale: isLgDown ? 0.99 : 0.98,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem/ecosystem-2.png'}
        />
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: isLgDown ? 185 : 330,
                  y: isLgDown ? 20 : -35,
                  scale: isLgDown ? 0.72 : 0.72,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem/ecosystem-3.png'}
        />
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: isLgDown ? -90 : -350,
                  y: isLgDown ? 5 : 150,
                  scale: isLgDown ? 0.62 : 0.61,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem/ecosystem-4.png'}
        />
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: isLgDown ? -88 : -180,
                  y: isLgDown ? 145 : 205,
                  scale: isLgDown ? 0.99 : 0.99,
                }
              : INITIAL_EXAMPLE_CARD
          }
          src={'/images/ecosystem/ecosystem-5.png'}
        />
        <EcosystemImageCard
          animate={
            isAnimated
              ? {
                  x: isLgDown ? -10 : 10,
                  y: isLgDown ? 230 : 320,
                  scale: isLgDown ? 0.72 : 0.72,
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
                  x: isLgDown ? 86 : 300,
                  y: isLgDown ? 200 : 150,
                  rotate: 0,
                }
              : INITIAL_CARD_1
          }
          className={'gradient3'}
        >
          <span
            className={cn(
              'text-baseBlack opacity-80 typography-h4',
              'lg:typography-h2',
            )}
          >
            Censorship resistance
          </span>
        </EcosystemStackCard>
        <EcosystemStackCard className={'gradient2'}>
          <span
            className={cn(
              'text-baseBlack opacity-80 typography-h4',
              'lg:typography-h2',
            )}
          >
            Ultimate Privacy
          </span>
        </EcosystemStackCard>
        <EcosystemStackCard
          initial={INITIAL_CARD_3}
          animate={
            isAnimated
              ? {
                  x: isLgDown ? -86 : -300,
                  y: isLgDown ? -200 : -150,
                  rotate: 0,
                }
              : INITIAL_CARD_3
          }
          className={'gradient4'}
        >
          <span
            className={cn(
              'text-baseWhite opacity-80 typography-h4',
              'lg:typography-h2',
            )}
          >
            Secured by Ethereum
            <br />
            and Rarimo Layer 2
          </span>
        </EcosystemStackCard>
      </div>
      <IntersectionAnchor
        enterThreshold={0.7}
        exitThreshold={0.3}
        onIntersect={() => setIsAnimated(true)}
        onExit={() => setIsAnimated(false)}
      />
    </UiContainer>
  )
}

function EcosystemStackCard({
  className,
  transition = { duration: 1, type: 'spring' },
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
        'absolute size-[172px] rounded-[29px] px-[21px] py-[29px]',
        'lg:size-[240px] lg:rounded-[40px] lg:px-[30px] lg:py-[40px]',
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
      className={cn(
        'absolute size-[70px] rounded-[10px]',
        'lg:size-[140px] lg:rounded-[20px]',
        className,
      )}
    />
  )
}
