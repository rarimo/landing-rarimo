import { useEffect } from 'react';
import AdvantagesSection from '@/components/AdvantagesSection';
// import HowItWorksSection from '@/components/HowItWorksSection/HowItWorksSection';
import NftSettlementHeroSection from '@/components/NftSettlementHeroSection';
import ImplementationSection from '@/components/ImplementationSection';
import CommunitySection from '@/components/CommunitySection';
// import IntegrationsSection from '@/components/IntegrationsSection';
import { initSwiper } from '@/js';

const NftSettlementPage = () => {
  useEffect(() => {
    initSwiper();
  }, []);

  return (
    <>
      <NftSettlementHeroSection />
      <AdvantagesSection />
      {/* <IntegrationsSection /> */}
      {/* <HowItWorksSection /> */}
      <ImplementationSection />
      <CommunitySection />
    </>
  );
};

export default NftSettlementPage;
