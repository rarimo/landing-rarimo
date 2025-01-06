'use client'

import { useIntersectionObserver } from '@uidotdev/usehooks'
import { PropsWithChildren, useEffect, useState } from 'react'

import AbilitiesSection from '@/components/Homepage/components/AbilitiesSection'
import FooterSection from '@/components/Homepage/components/FooterSection'
import HeaderSection from '@/components/Homepage/components/HeaderSection'
import HeroSection from '@/components/Homepage/components/HeroSection'
// import PurposeSection from '@/app/components/PurposeSection'
import SafetySection from '@/components/Homepage/components/SafetySection'
import TextDescriptionSection from '@/components/Homepage/components/TextDescriptionSection'
import { WindowScrollProvider } from '@/contexts/window-scroll'
import { Anchors } from '@/enums'
import { HorizontalDivider } from '@/ui'

export default function Homepage() {
  const [activeLink, setActiveLink] = useState<Anchors>(Anchors.Hero)

  return (
    <WindowScrollProvider>
      <HeaderSection activeLink={activeLink} setActiveLink={setActiveLink} />

      <main className='text-text-primary flex flex-col'>
        <div className='flex flex-col gap-16 bg-backgroundPrimary py-16 lg:gap-36 lg:py-30'>
          <IntersectionComponent
            id={Anchors.Hero}
            onIntersect={() => {
              if (activeLink === Anchors.Hero) return

              setActiveLink(Anchors.Hero)
            }}
          >
            <HeroSection />
          </IntersectionComponent>
        </div>
        <div className='bg-background-container flex flex-col pt-12 lg:py-30 lg:pb-0'>
          <IntersectionComponent
            id={Anchors.Description}
            onIntersect={() => {
              if (activeLink === Anchors.Description) return

              setActiveLink(Anchors.Description)
            }}
          >
            <TextDescriptionSection />
          </IntersectionComponent>

          <HorizontalDivider className='my-[68px] md:my-[120px]' />

          <IntersectionComponent
            id={Anchors.Abilities}
            onIntersect={() => {
              if (activeLink === Anchors.Abilities) return

              setActiveLink(Anchors.Abilities)
            }}
          >
            <AbilitiesSection />
          </IntersectionComponent>

          <HorizontalDivider className='my-[68px] md:my-[120px]' />

          <IntersectionComponent
            id={Anchors.Safety}
            onIntersect={() => {
              if (activeLink === Anchors.Safety) return

              setActiveLink(Anchors.Safety)
            }}
          >
            <SafetySection />
          </IntersectionComponent>

          {/*<HorizontalDivider className='my-[68px] md:my-[120px]' />*/}

          {/*<IntersectionComponent*/}
          {/*  id={Anchors.Purpose}*/}
          {/*  onIntersect={() => {*/}
          {/*    if (activeLink === Anchors.Purpose) return*/}

          {/*    setActiveLink(Anchors.Purpose)*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <PurposeSection />*/}
          {/*</IntersectionComponent>*/}

          <HorizontalDivider className='mt-[68px] md:mt-[120px]' />

          <FooterSection />
        </div>
      </main>
    </WindowScrollProvider>
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
    threshold: 0,
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
