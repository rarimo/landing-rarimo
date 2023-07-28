import './NftCheckoutPage.scss';

import AdvantagesSection from '@/components/AdvantagesSection';
import CommunitySection from '@/components/CommunitySection';
import NftCheckoutBlockAnimationSection from '@/components/NftCheckoutBlockAnimationSection';
import NftCheckoutHeroSection from '@/components/NftCheckoutHeroSection';
import NftCheckoutStepsSection from '@/components/NftCheckoutStepsSection';
import SubscribeSection from '@/components/SubscribeSection';
import useAppContext from '@/hooks/useAppContext';

const NftCheckoutPage = () => {
  const { isDesktop } = useAppContext();

  return (
    <>
      <div className="nft-checkout-page__animation-container">
        <NftCheckoutHeroSection />
        {isDesktop ? (
          <NftCheckoutStepsSection />
        ) : (
          <NftCheckoutBlockAnimationSection />
        )}
      </div>
      <AdvantagesSection />
      <CommunitySection />
      <SubscribeSection />
    </>
  );
};

export default NftCheckoutPage;
