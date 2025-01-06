'use client'

import { useState } from 'react'

import EcosystemSection from '@/components/Homepage/components/EcosystemSection'
import HeroSection from '@/components/Homepage/components/HeroSection'
import HomeSidebar from '@/components/Homepage/components/HomeSidebar'
import RegistrySection from '@/components/Homepage/components/RegistrySection'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'

export default function Homepage() {
  const [activeLink, setActiveLink] = useState<Anchors>(Anchors.Hero)

  return (
    <div className={cn('flex gap-12 bg-backgroundPrimary')}>
      <div
        className={cn('hidden p-8 pr-0', 'md:flex', 'sticky top-0', 'h-dvh')}
      >
        <HomeSidebar activeLink={activeLink} setActiveLink={setActiveLink} />
      </div>

      <main className={cn('relative flex flex-1 flex-col')}>
        <HeroSection />
        <EcosystemSection />
        <RegistrySection />
        <HeroSection />
      </main>
    </div>
  )
}
