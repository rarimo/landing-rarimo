import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/theme/utils'
import { UiGradientDecor } from '@/ui/index'

const UiContainer = forwardRef<
  HTMLDivElement,
  {
    isFullHeight?: boolean
    showGradientDecor?: boolean
    gradientDecorClassName?: string
  } & HTMLAttributes<HTMLDivElement>
>(
  (
    {
      isFullHeight = true,
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
          isFullHeight && 'h-[calc(100vh-68px)] md:h-dvh',
          'p-2',
          'md:p-8',
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
