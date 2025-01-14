import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/theme/utils'

const UiContainer = forwardRef<
  HTMLDivElement,
  {
    isFullHeight?: boolean
  } & HTMLAttributes<HTMLDivElement>
>(({ isFullHeight = true, className, ...rest }, ref) => {
  return (
    <div
      className={cn(
        isFullHeight && 'h-[calc(100dvh-68px)] md:h-dvh',
        'p-2',
        'md:p-8',
      )}
    >
      <div
        {...rest}
        ref={ref}
        className={cn('z-10 size-full rounded-3xl', className)}
      />
    </div>
  )
})

export default UiContainer
