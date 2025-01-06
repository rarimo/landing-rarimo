import { forwardRef, HTMLAttributes } from 'react'

import { cn } from '@/theme/utils'

const Container = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...rest }, ref) => {
    return (
      <div className={cn('h-dvh w-full p-2', 'md:p-8 md:pl-0')}>
        <div
          {...rest}
          ref={ref}
          className={cn('size-full rounded-3xl', className)}
        />
      </div>
    )
  },
)

export default Container
