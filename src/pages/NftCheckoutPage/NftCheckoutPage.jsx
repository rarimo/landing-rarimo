import './NftCheckoutPage.scss';

import AdvantagesSection from '@/components/AdvantagesSection';
import CommunitySection from '@/components/CommunitySection';
import NftCheckoutHeroSection from '@/components/NftCheckoutHeroSection';
import NftCheckoutStepsSection from '@/components/NftCheckoutStepsSection';
import SubscribeSection from '@/components/SubscribeSection';

const NftCheckoutPage = () => {
  return (
    <>
      <div className="nft-checkout-page__animation-container">
        <NftCheckoutHeroSection />
        <NftCheckoutStepsSection />
      </div>
      <AdvantagesSection />
      <CommunitySection />
      <SubscribeSection />
    </>
  );
};

export default NftCheckoutPage;
