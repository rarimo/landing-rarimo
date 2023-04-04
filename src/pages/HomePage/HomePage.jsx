import { useEffect } from 'react';
import HomeHeroSection from '@/components/HomeHeroSection';
import WhatRarimoDoesSection from '@/components/WhatRarimoDoesSection';
import VerticalsSection from '@/components/VerticalsSection';
import UseCasesSection from '@/components/UseCasesSection';
import BackersSection from '@/components/BackersSection';
import SubscribeSection from '@/components/SubscribeSection';
import CommunitySection from '@/components/CommunitySection';
import { initSwiper } from '@/js';

const HomePage = () => {
  useEffect(() => {
    initSwiper();
  }, []);

  return (
    <>
      <HomeHeroSection />
      <WhatRarimoDoesSection />
      <VerticalsSection />
      <UseCasesSection />
      <BackersSection />
      <SubscribeSection />
      <CommunitySection />
    </>
  );
};

export default HomePage;
