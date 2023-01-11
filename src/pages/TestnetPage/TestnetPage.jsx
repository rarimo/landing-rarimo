import CommunitySection from '@/components/CommunitySection';
import TestnetDescSection from '@/components/TestnetDescSection';
import TestnetHeroSection from '@/components/TestnetHeroSection';

const TestnetPage = () => {
  return (
    <>
      <TestnetHeroSection />
      <TestnetDescSection />
      <CommunitySection isHomePage={false} />
    </>
  );
};

export default TestnetPage;
