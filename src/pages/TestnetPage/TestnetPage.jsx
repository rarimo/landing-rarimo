import MetaTags from 'react-meta-tags';
import CommunitySection from '@/components/CommunitySection';
import TestnetDescSection from '@/components/TestnetDescSection';
import TestnetHeroSection from '@/components/TestnetHeroSection';

const TestnetPage = () => {
  return (
    <>
      <MetaTags>
        <meta property="og:image" content="/img/branding/og-testnet-img.jpg" />
        <meta property="og:image:height" content="934" />
        <meta property="og:image:width" content="1658" />
        <meta name="twitter:image" content="/img/branding/og-testnet-img.jpg" />
      </MetaTags>
      <TestnetHeroSection />
      <TestnetDescSection />
      <CommunitySection isHomePage={false} />
    </>
  );
};

export default TestnetPage;
