import { cn } from '@/theme/utils'
import Container from '@/ui/Container'

export default function HorizontalDivider({
  className,
}: {
  className?: string
}) {
  return (
    <Container className={cn(className)}>
      <div className='h-0.5 w-full bg-componentPrimary' />
    </Container>
  )
}
