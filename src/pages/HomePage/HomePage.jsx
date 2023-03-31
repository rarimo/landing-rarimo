import { useEffect } from 'react';
import HomeHeroSection from '@/components/HomeHeroSection';
import WhatRarimoDoesSection from '@/components/WhatRarimoDoesSection';
import VerticalsSection from '@/components/VerticalsSection';
import BackersSection from '@/components/BackersSection';
import SubscribeSection from '@/components/SubscribeSection';
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
      <BackersSection />
      <SubscribeSection />
    </>
  );
};

export default HomePage;
