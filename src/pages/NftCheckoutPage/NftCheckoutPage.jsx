import './NftCheckoutPage.scss';

// eslint-disable-next-line import/no-unresolved
// import 'https://cdnjs.cloudflare.com/ajax/libs/bodymovin/5.12.0/lottie.min.js';
import { useEffect, useState } from 'react';

import CommunitySection from '@/components/CommunitySection';
import NftCheckoutHeroSection from '@/components/NftCheckoutHeroSection';
import NftCheckoutStepsSection from '@/components/NftCheckoutStepsSection';
import { initAOS } from '@/js';

const NftCheckoutPage = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    initAOS();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep(prev => (prev === 3 ? 0 : prev + 1));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <NftCheckoutHeroSection />
      <NftCheckoutStepsSection animationStep={animationStep} />
      {/* <HowItWorksSection />
      <ImplementationSection /> */}
      <CommunitySection />
      {/* TODO: add badge into footer
      https://alchemotion.notion.site/Alchemy-Badge-Installation-Steps-1daeaccf15364448a72fae5a061a8945 */}
    </>
  );
};

export default NftCheckoutPage;
