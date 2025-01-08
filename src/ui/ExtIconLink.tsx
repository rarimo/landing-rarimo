import Link from 'next/link'
import { ComponentProps } from 'react'

import ExternalLinkIcon from '@/assets/icons/external-link-icon.svg'
import { cn } from '@/theme/utils'

export default function ExtIconLink({
  children,
  className,
  ...rest
}: ComponentProps<typeof Link>) {
  return (
    <Link {...rest} className={cn('flex items-center gap-2', className)}>
      {children}
      <ExternalLinkIcon />
    </Link>
  )
}
