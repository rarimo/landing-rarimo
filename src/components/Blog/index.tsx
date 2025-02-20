import { Suspense } from 'react'

import BlogFooter from '@/components/Blog/components/BlogFooter'
import { cn } from '@/theme/utils'
import { UiHorizontalDivider } from '@/ui'

import Articles from './components/Articles'
import BlogNavbar from './components/BlogNavbar'
import HeroSection from './components/HeroSection'

export default function Blog({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  return (
    <div className={cn('flex flex-col overflow-hidden bg-backgroundPrimary')}>
      <Suspense>
        <BlogNavbar />
      </Suspense>

      <div
        className={cn(
          'mx-auto flex w-full max-w-[1136px] flex-col',
          'px-4 md:px-6 lg:px-0',
        )}
      >
        <HeroSection className='mt-6 px-0 py-0 md:px-0 md:py-0' />

        <Suspense>
          <Articles searchParams={searchParams} />
        </Suspense>

        <UiHorizontalDivider className='mb-12 mt-14' />

        <BlogFooter />
      </div>
    </div>
  )
}
