import CommunitySection from '@/components/CommunitySection';
import ConfidentialIdentitySection from '@/components/ConfidentialIdentitySection';
import HomeHeroSection from '@/components/HomeHeroSection';
import NewsSection from '@/components/NewsSection';
import ProtocolSection from '@/components/ProtocolSection';
import SolutionsSection from '@/components/SolutionsSection';

const HomePage = () => {
  return (
    <>
      <HomeHeroSection />
      <NewsSection />
      <ConfidentialIdentitySection />
      <ProtocolSection />
      <SolutionsSection />
      <CommunitySection />
    </>
  );
};

export default HomePage;
