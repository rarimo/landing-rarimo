import { cn } from '@/theme/utils'

export default function UiHorizontalDivider({
  className,
}: {
  className?: string
}) {
  return <div className={cn('h-0.5 w-full bg-componentPrimary', className)} />
}
