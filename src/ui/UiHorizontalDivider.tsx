import { cn } from '@/theme/utils'

export default function UiHorizontalDivider({
  className,
}: {
  className?: string
}) {
  return <div className={cn('h-[1px] w-full bg-componentPrimary', className)} />
}
