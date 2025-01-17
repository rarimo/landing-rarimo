'use client'

import { useState } from 'react'

import HomeHeader from '@/common/HomeHeader'
import { HomeSidebar } from '@/common/HomeSidebar'
import QRCodeBlock from '@/common/QRCodeBlock'
import CommunitySection from '@/components/Homepage/components/CommunitySection'
import EcosystemSection from '@/components/Homepage/components/EcosystemSection'
import HeroSection from '@/components/Homepage/components/HeroSection'
import NewsSection from '@/components/Homepage/components/NewsSection'
import ProjectsSection from '@/components/Homepage/components/ProjectsSection'
import RegistriesSection from '@/components/Homepage/components/RegistriesSection'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'

export default function Homepage() {
  const [activeLink, setActiveLink] = useState<Anchors>(Anchors.Home)

  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden bg-backgroundPrimary',
        'lg:flex-row lg:gap-12',
      )}
    >
      <div className={cn('fixed top-0 hidden h-dvh p-12 pr-0', 'lg:flex')}>
        <HomeSidebar activeLink={activeLink} setActiveLink={setActiveLink} />
      </div>
      <div className={cn('flex', 'lg:hidden')}>
        <HomeHeader activeLink={activeLink} setActiveLink={setActiveLink} />
      </div>
      <main
        className={cn(
          'relative flex flex-1 flex-col overflow-hidden',
          'lg:ml-[248px]',
        )}
      >
        <HeroSection />
        <EcosystemSection />
        <ProjectsSection />
        <RegistriesSection />
        <CommunitySection />
        <NewsSection />
        <QRCodeBlock />
      </main>
    </div>
  )
}
