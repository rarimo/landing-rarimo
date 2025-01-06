import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/theme/utils'

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => {
    return (
      <div className={cn('h-dvh w-full p-8 pl-0')}>
        <div
          {...rest}
          ref={ref}
          className={cn('size-full rounded-lg', className)}
        />
      </div>
    )
  },
)

export default Container
