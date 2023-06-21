import { useEffect } from 'react';

import BackersSection from '@/components/BackersSection';
import CommunitySection from '@/components/CommunitySection';
import HomeHeroSection from '@/components/HomeHeroSection';
import HowRarimoWorksSection from '@/components/HowRarimoWorksSection';
import MarqueeSection from '@/components/MarqueeSection';
import NewsSection from '@/components/NewsSection';
import SubscribeSection from '@/components/SubscribeSection';
import UseCasesSection from '@/components/UseCasesSection';
import { initAOS } from '@/js';

const HomePage = () => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <>
      <HomeHeroSection />
      <MarqueeSection />
      <HowRarimoWorksSection />
      <UseCasesSection />
      <BackersSection />
      <NewsSection />
      <CommunitySection />
      <SubscribeSection />
    </>
  );
};

export default HomePage;
