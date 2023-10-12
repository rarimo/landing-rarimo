import BackersSection from '@/components/BackersSection';
import CommunitySection from '@/components/CommunitySection';
import HomeHeroSection from '@/components/HomeHeroSection';
import HowRarimoWorksSection from '@/components/HowRarimoWorksSection';
import NewsSection from '@/components/NewsSection';
import SubscribeSection from '@/components/SubscribeSection';
import UseCasesSection from '@/components/UseCasesSection';

const HomePage = () => {
  return (
    <>
      <HomeHeroSection />
      <HowRarimoWorksSection />
      <UseCasesSection />
      <BackersSection />
      <NewsSection />
      <CommunitySection />
      <SubscribeSection />
    </>
  );
};

export default HomePage;
