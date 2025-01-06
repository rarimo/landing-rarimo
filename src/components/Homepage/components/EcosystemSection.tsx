'use client'

import { AnimationProps, motion, useAnimation, useScroll } from 'motion/react'
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

  const card1Controls = useAnimation()
  const card3Controls = useAnimation()

  const ecosystem1CardControls = useAnimation()
  const ecosystem2CardControls = useAnimation()
  const ecosystem3CardControls = useAnimation()
  const ecosystem4CardControls = useAnimation()
  const ecosystem5CardControls = useAnimation()
  const ecosystem6CardControls = useAnimation()

  const animateTo = async () => {
    await Promise.all([
      card1Controls.start({
        x: 300,
        y: 150,
        rotate: 0,
        transition: { type: 'spring', duration: 0.75 },
      }),
      card3Controls.start({
        x: -300,
        y: -150,
        rotate: 0,
        transition: { type: 'spring', duration: 0.75 },
      }),

      ecosystem1CardControls.start({
        x: 100,
        y: -190,
      }),
      ecosystem2CardControls.start({
        x: 350,
        y: -250,
        scale: 0.8,
      }),
      ecosystem3CardControls.start({
        x: 300,
        y: -90,
        scale: 0.8,
      }),

      ecosystem4CardControls.start({
        x: -300,
        y: 150,
        scale: 0.6,
      }),
      ecosystem5CardControls.start({
        x: -170,
        y: 250,
      }),
      ecosystem6CardControls.start({
        x: 50,
        y: 290,
      }),
    ])
    setIsAnimated(true)
  }

  const animateToInitial = async () => {
    await Promise.all([
      card1Controls.start({
        ...INITIAL_CARD_1,
        transition: { type: 'spring', duration: 0.75 },
      }),
      card3Controls.start({
        ...INITIAL_CARD_3,
        transition: { type: 'spring', duration: 0.75 },
      }),

      ecosystem1CardControls.start({
        ...INITIAL_EXAMPLE_CARD,
        transition: { type: 'spring', duration: 0.75 },
      }),
      ecosystem2CardControls.start({
        ...INITIAL_EXAMPLE_CARD,
        transition: { type: 'spring', duration: 0.75 },
      }),
      ecosystem3CardControls.start({
        ...INITIAL_EXAMPLE_CARD,
        transition: { type: 'spring', duration: 0.75 },
      }),
      ecosystem4CardControls.start({
        ...INITIAL_EXAMPLE_CARD,
        transition: { type: 'spring', duration: 0.75 },
      }),
      ecosystem5CardControls.start({
        ...INITIAL_EXAMPLE_CARD,
        transition: { type: 'spring', duration: 0.75 },
      }),
      ecosystem6CardControls.start({
        ...INITIAL_EXAMPLE_CARD,
        transition: { type: 'spring', duration: 0.75 },
      }),
    ])
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
          animate={ecosystem1CardControls}
          src={'/images/ecosystem-example.png'}
          initial={INITIAL_EXAMPLE_CARD}
        />
        <EcosystemExampleCard
          animate={ecosystem2CardControls}
          src={'/images/ecosystem-example.png'}
          initial={INITIAL_EXAMPLE_CARD}
        />
        <EcosystemExampleCard
          animate={ecosystem3CardControls}
          src={'/images/ecosystem-example.png'}
          initial={INITIAL_EXAMPLE_CARD}
        />
        <EcosystemExampleCard
          animate={ecosystem4CardControls}
          src={'/images/ecosystem-example.png'}
          initial={INITIAL_EXAMPLE_CARD}
        />
        <EcosystemExampleCard
          animate={ecosystem5CardControls}
          src={'/images/ecosystem-example.png'}
          initial={INITIAL_EXAMPLE_CARD}
        />
        <EcosystemExampleCard
          animate={ecosystem6CardControls}
          src={'/images/ecosystem-example.png'}
          initial={INITIAL_EXAMPLE_CARD}
        />

        <EcosystemCard
          initial={INITIAL_CARD_1}
          animate={card1Controls}
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
          animate={card3Controls}
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
