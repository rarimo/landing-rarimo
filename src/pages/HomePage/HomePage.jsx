import CommunitySection from '@/components/CommunitySection';
import HomeHeroSection from '@/components/HomeHeroSection';
import NewsSection from '@/components/NewsSection';
import RollupSection from '@/components/RollupSection';
import SolutionsSection from '@/components/SolutionsSection';
import ZkRegisterSection from '@/components/ZkRegisterSection';

const HomePage = () => {
  return (
    <>
      <HomeHeroSection />
      <NewsSection />
      <ZkRegisterSection />
      <RollupSection />
      <SolutionsSection />
      <CommunitySection />
    </>
  );
};

export default HomePage;
