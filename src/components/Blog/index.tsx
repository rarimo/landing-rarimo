import { cn } from '@/theme/utils'
import { UiHorizontalDivider } from '@/ui'

import Articles from './components/Articles'
import HeroSection from './components/HeroSection'

export default function Blog() {
  return (
    <div className={cn('flex flex-col overflow-hidden bg-backgroundPrimary')}>
      <div className='mx-auto flex max-w-[1136px] flex-col'>
        <HeroSection className='px-0 py-0 md:px-0 md:py-0' />
        <Articles />

        <UiHorizontalDivider className='mt-14' />
      </div>
    </div>
  )
}
