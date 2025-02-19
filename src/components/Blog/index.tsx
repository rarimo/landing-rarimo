import Footer from '@/components/Blog/components/Footer'
import { cn } from '@/theme/utils'
import { UiHorizontalDivider } from '@/ui'

import Articles from './components/Articles'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'

export default function Blog() {
  return (
    <div className={cn('flex flex-col overflow-hidden bg-backgroundPrimary')}>
      <div
        className={cn(
          'mx-auto flex max-w-[1136px] flex-col',
          'px-4 md:px-6 lg:px-0',
        )}
      >
        <Navbar />

        <HeroSection className='px-0 py-0 md:px-0 md:py-0' />
        <Articles />

        <UiHorizontalDivider className='mb-12 mt-14' />

        <Footer />
      </div>
    </div>
  )
}
