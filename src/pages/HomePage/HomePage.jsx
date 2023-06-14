import { useEffect } from 'react';

import BackersSection from '@/components/BackersSection';
import CommunitySection from '@/components/CommunitySection';
import HomeHeroSection from '@/components/HomeHeroSection';
import MarqueeSection from '@/components/MarqueeSection';
import NewsSection from '@/components/NewsSection';
import SubscribeSection from '@/components/SubscribeSection';
import UseCasesSection from '@/components/UseCasesSection';
import VerticalsSection from '@/components/VerticalsSection';
import WhatIsRarimoSection from '@/components/WhatIsRarimoSection';
import { initAOS } from '@/js';

const HomePage = () => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <>
      <HomeHeroSection />
      <MarqueeSection />
      <WhatIsRarimoSection />
      <VerticalsSection />
      <UseCasesSection />
      <BackersSection />
      <NewsSection />
      <CommunitySection />
      <SubscribeSection />
    </>
  );
};

export default HomePage;
