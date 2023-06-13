import './NftCheckoutPage.scss';

import { useEffect } from 'react';

import AdvantagesSection from '@/components/AdvantagesSection';
import CommunitySection from '@/components/CommunitySection';
import NftCheckoutHeroSection from '@/components/NftCheckoutHeroSection';
import NftCheckoutStepsSection from '@/components/NftCheckoutStepsSection';
import SubscribeSection from '@/components/SubscribeSection';
import { initAOS } from '@/js';

const NftCheckoutPage = () => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <>
      <NftCheckoutHeroSection />
      <NftCheckoutStepsSection />
      <AdvantagesSection />
      <CommunitySection />
      <SubscribeSection />
    </>
  );
};

export default NftCheckoutPage;
