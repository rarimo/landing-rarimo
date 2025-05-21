'use client'

import { useIntersectionObserver } from '@uidotdev/usehooks'
import { PropsWithChildren, useEffect, useState } from 'react'

import HomeHeader from '@/common/HomeHeader'
import { HomeSidebar } from '@/common/HomeSidebar'
import QRCodeBlock from '@/common/QRCodeBlock'
import CommunitySection from '@/components/Homepage/components/CommunitySection'
import EcosystemSection from '@/components/Homepage/components/EcosystemSection'
import HeroSection from '@/components/Homepage/components/HeroSection'
import NewsSection from '@/components/Homepage/components/NewsSection'
import ProjectsSection from '@/components/Homepage/components/ProjectsSection'
import { Anchors } from '@/enums'
import { cn } from '@/theme/utils'

import ZkAISection from './components/ZkAISection'
import ZkPassportSection from './components/ZkPassportSection'

export default function Homepage() {
  const [activeLink, setActiveLink] = useState<Anchors>(Anchors.Home)

  return (
    <div
      className={cn(
        'flex flex-col bg-backgroundPrimary',
        'relative lg:flex-row lg:gap-12',
      )}
    >
      <div className={cn('fixed top-0 hidden h-dvh p-12 pr-0', 'lg:flex')}>
        <HomeSidebar activeLink={activeLink} setActiveLink={setActiveLink} />
      </div>
      <div className='center border-r-lg sticky top-0 z-[50] bg-backgroundPure lg:hidden'>
        <HomeHeader activeLink={activeLink} setActiveLink={setActiveLink} />
      </div>
      <main
        className={cn(
          'relative flex flex-1 flex-col overflow-hidden',
          'lg:ml-[248px]',
        )}
      >
        <IntersectionComponent
          id={Anchors.Home}
          onIntersect={() => {
            if (activeLink === Anchors.Home) return

            setActiveLink(Anchors.Home)
          }}
        >
          <HeroSection />
        </IntersectionComponent>

        <IntersectionComponent
          id={Anchors.Ecosystem}
          onIntersect={() => {
            if (activeLink === Anchors.Ecosystem) return

            setActiveLink(Anchors.Ecosystem)
          }}
        >
          <EcosystemSection />
        </IntersectionComponent>

        <IntersectionComponent
          id={Anchors.ZkAI}
          onIntersect={() => {
            if (activeLink === Anchors.ZkAI) return

            setActiveLink(Anchors.ZkAI)
          }}
        >
          <ZkAISection />
        </IntersectionComponent>

        <IntersectionComponent
          id={Anchors.ZkPassport}
          onIntersect={() => {
            if (activeLink === Anchors.ZkPassport) return

            setActiveLink(Anchors.ZkPassport)
          }}
        >
          <ZkPassportSection />
        </IntersectionComponent>

        <ProjectsSection />

        <IntersectionComponent
          id={Anchors.Community}
          onIntersect={() => {
            if (activeLink === Anchors.Community) return

            setActiveLink(Anchors.Community)
          }}
        >
          <CommunitySection />
        </IntersectionComponent>
        <NewsSection />
        <QRCodeBlock />
      </main>
    </div>
  )
}

function IntersectionComponent({
  children,
  onIntersect,
  id,
}: PropsWithChildren<{
  onIntersect: () => void
  id?: string
}>) {
  const [ref, entry] = useIntersectionObserver({
    threshold: 0.9,
    root: null,
    rootMargin: '0px',
  })

  useEffect(() => {
    if (!entry?.isIntersecting) return

    onIntersect()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entry?.isIntersecting])

  return (
    <div id={id} ref={ref}>
      {children}
    </div>
  )
}
