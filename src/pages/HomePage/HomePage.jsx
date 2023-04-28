import { useEffect } from 'react';

import BackersSection from '@/components/BackersSection';
import CommunitySection from '@/components/CommunitySection';
import HomeHeroSection from '@/components/HomeHeroSection';
import NewsSection from '@/components/NewsSection';
import SubscribeSection from '@/components/SubscribeSection';
import UseCasesSection from '@/components/UseCasesSection';
import VerticalsSection from '@/components/VerticalsSection';
import WhatRarimoDoesSection from '@/components/WhatRarimoDoesSection';
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
      <NewsSection />
      <SubscribeSection />
      <CommunitySection />
    </>
  );
};

export default HomePage;
