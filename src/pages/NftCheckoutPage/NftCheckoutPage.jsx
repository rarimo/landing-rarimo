import './NftCheckoutPage.scss';

import { useEffect } from 'react';

import CommunitySection from '@/components/CommunitySection';
import NftCheckoutHeroSection from '@/components/NftCheckoutHeroSection';
import NftCheckoutStepsSection from '@/components/NftCheckoutStepsSection';
import { initAOS } from '@/js';

const NftCheckoutPage = () => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <>
      <NftCheckoutHeroSection />
      <NftCheckoutStepsSection />
      <CommunitySection />
    </>
  );
};

export default NftCheckoutPage;
