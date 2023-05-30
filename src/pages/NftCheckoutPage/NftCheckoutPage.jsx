import { useEffect } from 'react';

import CommunitySection from '@/components/CommunitySection';
import NftCheckoutHeroSection from '@/components/NftCheckoutHeroSection';
import { initSwiper } from '@/js';

const NftCheckoutPage = () => {
  useEffect(() => {
    initSwiper();
  }, []);

  return (
    <>
      <NftCheckoutHeroSection />
      {/* <HowItWorksSection />
      <ImplementationSection /> */}
      <CommunitySection />
      {/* TODO: add badge into footer
      https://alchemotion.notion.site/Alchemy-Badge-Installation-Steps-1daeaccf15364448a72fae5a061a8945 */}
    </>
  );
};

export default NftCheckoutPage;
