import './NftCheckoutPage.scss';

import useResizeObserver from '@react-hook/resize-observer';
import cn from 'classnames';
import { throttle } from 'lodash-es';
import lottie from 'lottie-web';
import { useEffect, useRef } from 'react';
import { useIntersection, usePrevious } from 'react-use';

import AdvantagesSection from '@/components/AdvantagesSection';
import CommunitySection from '@/components/CommunitySection';
import NftCheckoutHeroSection from '@/components/NftCheckoutHeroSection';
import NftCheckoutStepsSection from '@/components/NftCheckoutStepsSection';
import SubscribeSection from '@/components/SubscribeSection';
import useAppContext from '@/hooks/useAppContext';
import useStateRef from '@/hooks/useStateRef';

const fillFramesRange = startFrame => {
  return Array(2)
    .fill(null)
    .map((_, i) => startFrame + i);
};

const STEP_FRAMES = [
  fillFramesRange(110),
  fillFramesRange(200),
  fillFramesRange(330),
  fillFramesRange(450),
];

const STEPS_ANIMATION_SLIDES_QUANTITY = 4;

let onScroll;
let onSquareParallax;
let stepsSectionWrapperInitialRect;
let heroSectionInitialRect;

const NftCheckoutPage = () => {
  const { isDesktop } = useAppContext();

  const heroSectionRef = useRef(null);
  const stepsSectionWrapperRef = useRef(null);
  const stepsSectionRef = useRef(null);
  const animationRef = useRef(null);
  const lottieWrapperRef = useRef(null);
  const lottieRef = useRef(null);
  const squareOne = useRef(null);
  const squareTwo = useRef(null);
  const lastScrollPositionRef = useRef(0);

  const [, setIsStickySection, isStickySectionRef] = useStateRef(false);
  const [animationStep, setAnimationStep, animationStepRef] = useStateRef(0);

  const prevAnimationStep = usePrevious(animationStep);

  const heroSectionObserver = useIntersection(heroSectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  });

  const placeLottieWrapperOnContainer = () => {
    const sectionWidth = stepsSectionRef.current.getBoundingClientRect().width;
    const right = (screen.availWidth - sectionWidth) / 2;

    lottieWrapperRef.current.style.right = `${right}px`;
  };

  useResizeObserver(document.documentElement, () => {
    placeLottieWrapperOnContainer();
  });

  const initAnimation = () => {
    if (animationRef.current) {
      destroyAnimation();
    }

    const params = {
      container: lottieRef.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/animation/nft-checkout-demo.json',
    };

    animationRef.current = lottie.loadAnimation(params);

    animationRef.current.addEventListener('drawnFrame', frameEvent => {
      const isFrameInRange = STEP_FRAMES[animationStepRef.current]?.includes(
        Math.ceil(frameEvent.currentTime),
      );
      if (isFrameInRange && isStickySectionRef.current) {
        animationRef.current.pause();
      }
    });
  };

  const destroyAnimation = () => {
    animationRef.current?.destroy();
  };

  const changeStepOnScroll = () => {
    if (!animationRef.current) return;

    const currentScrollPosition = window.scrollY;

    const sectionScrollPercent = Math.ceil(
      ((currentScrollPosition - stepsSectionWrapperInitialRect.top) /
        (stepsSectionWrapperInitialRect.height - screen.availHeight)) *
        100,
    );

    if (sectionScrollPercent > 100) return;

    const percentsForSlide = 100 / STEPS_ANIMATION_SLIDES_QUANTITY;

    switch (true) {
      case sectionScrollPercent > percentsForSlide * 3:
        setAnimationStep(3);
        break;
      case sectionScrollPercent > percentsForSlide * 2:
        setAnimationStep(2);
        break;
      case sectionScrollPercent > percentsForSlide:
        setAnimationStep(1);
        break;
      default:
        setAnimationStep(0);
        break;
    }
  };

  const squareParallax = () => {
    if (!squareOne.current || !squareTwo.current) return;

    const currentScrollPosition = window.scrollY;

    const sectionShift =
      heroSectionInitialRect.height / 2 - currentScrollPosition;

    let translate1 = 0;
    let translate2 = 0;
    let opacity = 1;
    const speed1 = 0.9;
    const speed2 = 1.2;

    if (sectionShift * -1 > screen.availHeight) return;

    opacity = 1 - currentScrollPosition / heroSectionInitialRect.height;
    squareOne.current.style.opacity = `${opacity}`;
    squareTwo.current.style.opacity = `${opacity}`;

    if (sectionShift < 0) {
      translate1 = sectionShift * speed1;
      translate2 = sectionShift * speed2;
    }

    lastScrollPositionRef.current = currentScrollPosition;

    squareOne.current.style.transform = `translateY(${translate1}px)`;
    squareTwo.current.style.transform = `translateY(${translate2}px)`;
  };

  useEffect(() => {
    setAnimationStep(0);
    initAnimation();

    return () => {
      destroyAnimation();
    };
  }, [isDesktop]);

  useEffect(() => {
    const setInitialBoundingRects = () => {
      stepsSectionWrapperInitialRect =
        stepsSectionWrapperRef.current.getBoundingClientRect();
    };

    setInitialBoundingRects();

    onScroll = throttle(changeStepOnScroll, 15);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true });
      onScroll = null;
    };
  }, []);

  useEffect(() => {
    const removeListeners = () => {
      window.removeEventListener('scroll', onSquareParallax, { passive: true });
      onSquareParallax = null;
    };

    if (isDesktop) {
      heroSectionInitialRect = heroSectionRef.current.getBoundingClientRect();

      onSquareParallax = throttle(squareParallax, 15);

      window.addEventListener('scroll', onSquareParallax, { passive: true });
      return;
    }

    if (!isDesktop) {
      removeListeners();
    }

    return () => {
      removeListeners();
    };
  }, [isDesktop]);

  useEffect(() => {
    animationRef.current.setDirection(
      animationStep > prevAnimationStep ? 1 : -1,
    );
    animationRef.current?.play();
  }, [animationStep]);

  useEffect(() => {
    setIsStickySection(!heroSectionObserver?.isIntersecting);

    animationRef.current.setDirection(
      heroSectionObserver?.isIntersecting ? -1 : 1,
    );

    animationRef.current?.play();
  }, [heroSectionObserver?.isIntersecting]);

  useEffect(() => {
    placeLottieWrapperOnContainer();
  }, []);

  return (
    <>
      <div
        className={cn([
          'nft-checkout-page__animation-container',
          {
            'nft-checkout-page__animation-container--sticky-section':
              heroSectionObserver && !heroSectionObserver.isIntersecting,
          },
        ])}
      >
        <NftCheckoutHeroSection ref={heroSectionRef} />
        <div
          ref={lottieWrapperRef}
          className="nft-checkout-page__lottie-wrapper"
        >
          <div ref={lottieRef} className="nft-checkout-page__lottie" />
          {isDesktop && (
            <>
              <div
                ref={squareOne}
                className="nft-checkout-page__parallax-square nft-checkout-page__parallax-square--first"
              />
              <div
                ref={squareTwo}
                className="nft-checkout-page__parallax-square nft-checkout-page__parallax-square--second"
              />
            </>
          )}
        </div>
        <div
          ref={stepsSectionWrapperRef}
          className="nft-checkout-page__steps-section-wrapper"
        >
          <NftCheckoutStepsSection
            ref={stepsSectionRef}
            animationStep={animationStep}
          />
        </div>
      </div>
      <AdvantagesSection />
      <CommunitySection />
      <SubscribeSection />
    </>
  );
};

export default NftCheckoutPage;
