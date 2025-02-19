import HeroSection from '@/components/Blog/components/HeroSection'
import { cn } from '@/theme/utils'

export default function Blog() {
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden bg-backgroundPrimary',
        'lg:flex-row lg:gap-12',
      )}
    >
      <HeroSection />
    </div>
  )
}
