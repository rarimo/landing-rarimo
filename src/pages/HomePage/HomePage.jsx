import { useEffect } from 'react';
import ExperienceSection from '@/components/ExperienceSection';
import HomeHeroSection from '@/components/HomeHeroSection';
import WhatRarimoDoesSection from '@/components/WhatRarimoDoesSection';
import UserCasesSection from '@/components/UserCasesSection';
import FeaturesSection from '@/components/FeaturesSection';
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
      {/* <ExperienceSection />
      <UserCasesSection />
      <FeaturesSection />
      <CommunitySection /> */}
    </>
  );
};

export default HomePage;
