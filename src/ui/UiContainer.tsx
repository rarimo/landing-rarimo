import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/theme/utils'
import { UiGradientDecor } from '@/ui/index'

const UiContainer = forwardRef<
  HTMLDivElement,
  {
    isFullHeight?: boolean
    fullHeightContainerClassName?: string
    showGradientDecor?: boolean
    gradientDecorClassName?: string
  } & HTMLAttributes<HTMLDivElement>
>(
  (
    {
      isFullHeight = true,
      fullHeightContainerClassName,
      showGradientDecor = false,
      gradientDecorClassName,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        className={cn(
          isFullHeight && 'h-[calc(100vh-68px)] md:h-dvh md:px-8 md:py-8',
          !isFullHeight && 'md:px-8 md:py-4',
          'px-2 py-3',
          fullHeightContainerClassName,
        )}
      >
        <div
          {...rest}
          ref={ref}
          className={cn(
            'relative z-10 size-full overflow-hidden rounded-3xl',
            className,
          )}
        >
          {showGradientDecor && (
            <UiGradientDecor gradientClassName={gradientDecorClassName} />
          )}
          {children}
        </div>
      </div>
    )
  },
)

export default UiContainer
