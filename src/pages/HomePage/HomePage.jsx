import BackersSection from '@/components/BackersSection';
import CommunitySection from '@/components/CommunitySection';
import HomeHeroSection from '@/components/HomeHeroSection';
import HowRarimoWorksSection from '@/components/HowRarimoWorksSection';
import NewsSection from '@/components/NewsSection';
import SubscribeSection from '@/components/SubscribeSection';
import UseCasesSection from '@/components/UseCasesSection';
import useAppContext from '@/hooks/useAppContext';

const HomePage = () => {
  const { needSkipAnimation } = useAppContext();

  return (
    <>
      <HomeHeroSection />
      {!needSkipAnimation ? (
        <HowRarimoWorksSection />
      ) : (
        <div className="how-rarimo-works-section__content" />
      )}
      <UseCasesSection />
      <BackersSection />
      <NewsSection />
      <CommunitySection />
      <SubscribeSection />
    </>
  );
};

export default HomePage;
