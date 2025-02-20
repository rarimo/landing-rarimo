import type { HTMLAttributes } from 'react'

import SubscribeForm from '@/common/SubscribeForm'
import { cn } from '@/theme/utils'
import { UiContainer } from '@/ui'

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'>

export default function HeroSection({ className, ...rest }: Props) {
  return (
    <UiContainer
      {...rest}
      showGradientDecor
      gradientDecorClassName={cn(
        '-right-[275px] -top-[205px] -rotate-[10deg] h-[367px] w-[438px]',
        'md:-right-[105px] md:-top-[225px] md:-rotate-[10deg] md:h-[367px] md:w-[438px]',
      )}
      fullHeightContainerClassName={cn(
        'md:h-[338px] h-[338px] w-full',
        className,
      )}
      className={cn(
        'flex flex-col items-center justify-center bg-backgroundContainer px-4',
      )}
    >
      <span
        className={cn(
          'bg-gradient-to-r from-[#45C45C] from-[-1.41%] to-[#39CDA0] to-[113.73%] bg-clip-text text-transparent',
          'text-center typography-subtitle3',
        )}
      >
        Learning Hub
      </span>
      <h2 className='mt-1 text-center text-textPrimary typography-h1'>
        Learn about <br /> Rarimo
      </h2>

      <SubscribeForm />
    </UiContainer>
  )
}
