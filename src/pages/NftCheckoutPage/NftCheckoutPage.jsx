import { useEffect } from 'react';

import AdvantagesSection from '@/components/AdvantagesSection';
import CommunitySection from '@/components/CommunitySection';
import NftCheckoutHeroSection from '@/components/NftCheckoutHeroSection';
import NftCheckoutStepsSectionCopy from '@/components/NftCheckoutStepsSectionCopy';
import SubscribeSection from '@/components/SubscribeSection';
import { initAOS } from '@/js';

const NftCheckoutPage = () => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <>
      <NftCheckoutHeroSection />
      <NftCheckoutStepsSectionCopy />
      <AdvantagesSection />
      <CommunitySection />
      <SubscribeSection />
    </>
  );
};

export default NftCheckoutPage;
