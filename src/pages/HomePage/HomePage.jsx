import CommunitySection from '@/components/CommunitySection';
import ConfidentialIdentitySection from '@/components/ConfidentialIdentitySection';
import HomeHeroSection from '@/components/HomeHeroSection';
import NewsSection from '@/components/NewsSection';
import SubscribeSection from '@/components/SubscribeSection';
import UseCasesSection from '@/components/UseCasesSection';

const HomePage = () => {
  return (
    <>
      <HomeHeroSection />
      <NewsSection />
      <ConfidentialIdentitySection />
      <ProtocolSection />
      <UseCasesSection />
      <CommunitySection />
      <SubscribeSection />
    </>
  );
};

function ProtocolSection() {
  return <div />;
}

export default HomePage;
