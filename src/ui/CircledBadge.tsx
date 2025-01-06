import { PropsWithChildren } from 'react'

import { cn } from '@/theme/utils'

export default function CircledBadge({
  children,
  className,
}: { className?: string } & PropsWithChildren) {
  return (
    <div
      className={cn(
        'flex size-6 items-center justify-center rounded-full bg-componentPrimary transition-all',
        className,
      )}
    >
      {children}
    </div>
  )
}
