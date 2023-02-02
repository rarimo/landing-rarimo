import { useEffect } from 'react';
import AdvantagesSection from '@/components/AdvantagesSection';
import HowItWorksSection from '@/components/HowItWorksSection/HowItWorksSection';
import NftCheckoutHeroSection from '@/components/NftCheckoutHeroSection';
import ImplementationSection from '@/components/ImplementationSection';
import CommunitySection from '@/components/CommunitySection';
// import IntegrationsSection from '@/components/IntegrationsSection';
import { initSwiper } from '@/js';

const NftCheckoutPage = () => {
  useEffect(() => {
    initSwiper();
  }, []);

  return (
    <>
      <NftCheckoutHeroSection />
      <AdvantagesSection />
      {/* <IntegrationsSection /> */}
      <HowItWorksSection />
      <ImplementationSection />
      <CommunitySection />
    </>
  );
};

export default NftCheckoutPage;
