import './HomeHeroDecor.scss';

import lottie from 'lottie-web';
import { memo, useEffect, useRef } from 'react';

import useAppContext from '@/hooks/useAppContext';

const HomeHeroDecor = () => {
  const { isDesktop } = useAppContext();

  const lottieRef = useRef(null);
  const lottieWrapperRef = useRef(null);
  const animationRef = useRef(null);

  const initAnimation = () => {
    if (animationRef.current) {
      destroyAnimation();
    }

    const params = {
      container: lottieRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: '/animation/pallarax-animation-home-page.json',
    };

    animationRef.current = lottie.loadAnimation(params);
  };

  const destroyAnimation = () => {
    animationRef.current?.destroy();
  };

  useEffect(() => {
    if (isDesktop) {
      initAnimation();
    } else {
      destroyAnimation();
    }

    return () => {
      destroyAnimation();
    };
  }, [isDesktop]);

  return (
    <div className="home-hero-decor">
      {isDesktop && (
        <div ref={lottieWrapperRef} className="home-hero-decor__lottie-wrapper">
          <div ref={lottieRef} className="home-hero-decor__lottie"></div>
        </div>
      )}
    </div>
  );
};

export default memo(HomeHeroDecor);
