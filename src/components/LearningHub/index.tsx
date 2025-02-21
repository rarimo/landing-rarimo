import { Suspense } from 'react'

import LearningHubFooter from '@/components/LearningHub/components/LearningHubFooter'
import { cn } from '@/theme/utils'
import { UiHorizontalDivider } from '@/ui'

import HeroSection from './components/HeroSection'
import LearningHubNavbar from './components/LearningHubNavbar'
import LearningHubPosts from './components/LearningHubPosts'

export default function LearningHub({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <div className={cn('flex flex-col overflow-hidden bg-backgroundPrimary')}>
      <Suspense>
        <LearningHubNavbar />
      </Suspense>

      <div
        className={cn(
          'mx-auto flex w-full max-w-[1136px] flex-col',
          'px-4 md:px-6 lg:px-0',
        )}
      >
        <HeroSection
          className='mt-6 px-0 py-0 md:px-0 md:py-0'
          data-aos='fade-in'
          data-aos-delay='500'
        />

        <Suspense>
          <LearningHubPosts searchParams={searchParams} />
        </Suspense>

        <UiHorizontalDivider className='mb-12 mt-14' />

        <LearningHubFooter />
      </div>
    </div>
  )
}
