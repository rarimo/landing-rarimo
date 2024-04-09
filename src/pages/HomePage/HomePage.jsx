import CommunitySection from '@/components/CommunitySection';
import HomeHeroSection from '@/components/HomeHeroSection';
import NewsSection from '@/components/NewsSection';
import SubscribeSection from '@/components/SubscribeSection';
import UseCasesSection from '@/components/UseCasesSection';

const HomePage = () => {
  return (
    <>
      <HomeHeroSection />
      <NewsSection />
      <UseCasesSection />
      <CommunitySection />
      <SubscribeSection />
    </>
  );
};

export default HomePage;
