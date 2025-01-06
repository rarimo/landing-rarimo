'use client'

import { useState } from 'react'

import HeroSection from '@/components/Homepage/components/HeroSection'
import HomeSidebar from '@/components/Homepage/components/HomeSidebar'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'

export default function Homepage() {
  const [activeLink, setActiveLink] = useState<Anchors>(Anchors.Hero)

  return (
    <div
      className={'flex size-full gap-12 overflow-hidden bg-backgroundPrimary'}
    >
      <div className={cn('hidden p-8 pr-0', 'md:flex')}>
        <HomeSidebar activeLink={activeLink} setActiveLink={setActiveLink} />
      </div>

      <main className='relative size-full flex-1 overflow-y-auto overflow-x-hidden'>
        <div className='absolute flex w-full flex-col'>
          <HeroSection />
          <HeroSection />
          <HeroSection />
          <HeroSection />
        </div>
      </main>
    </div>
  )
}