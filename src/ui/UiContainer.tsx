import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/theme/utils'

const UiContainer = forwardRef<
  HTMLDivElement,
  {
    isFullHeight?: boolean
  } & HTMLAttributes<HTMLDivElement>
>(({ isFullHeight = true, className, ...rest }, ref) => {
  return (
    <div className={cn(isFullHeight && 'h-dvh', 'p-2', 'md:p-8 md:pl-0')}>
      <div
        {...rest}
        ref={ref}
        className={cn('size-full rounded-3xl', className)}
      />
    </div>
  )
})

export default UiContainer
