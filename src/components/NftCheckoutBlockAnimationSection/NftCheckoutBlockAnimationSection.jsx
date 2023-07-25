import './NftCheckoutBlockAnimationSection.scss';

import useResizeObserver from '@react-hook/resize-observer';
import lottie from 'lottie-web';
import { useCallback, useEffect, useRef, useState } from 'react';
// import { useTranslation } from 'react-i18next';
import { useIntersection } from 'react-use';

// import { TOUCH_EVENTS } from '@/const';
// import { fillFramesRange } from '@/helpers';
import useAppContext from '@/hooks/useAppContext';

// const LAST_STEP_FRAME = 450;

const NftCheckoutBlockAnimationSection = () => {
  // const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  const animationFirstRef = useRef(null);
  const animationTwoRef = useRef(null);
  const animationThirdRef = useRef(null);
  const animationFourRef = useRef(null);

  // const lottieWrapperRef = useRef(null);
  const lottieRefFirst = useRef(null);
  const lottieRefTwo = useRef(null);
  const lottieRefThird = useRef(null);
  const lottieRefFour = useRef(null);

  const [observerParams, setObserverParams] = useState({
    threshold: 0.25,
  });
  const sectionObserverOne = useIntersection(lottieRefFirst, observerParams);
  const sectionObserverTwo = useIntersection(lottieRefTwo, observerParams);
  const sectionObserverThree = useIntersection(lottieRefThird, observerParams);
  const sectionObserverFour = useIntersection(lottieRefFour, observerParams);

  const initAnimation = useCallback(() => {
    if (animationFirstRef.current) {
      destroyAnimation();
    }

    const paramsOne = {
      container: lottieRefFirst.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/animation/1.json',
    };
    const paramsTwo = {
      container: lottieRefTwo.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/animation/2.json',
    };
    const paramsThree = {
      container: lottieRefThird.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/animation/3.json',
    };
    const paramsFour = {
      container: lottieRefFour.current,
      renderer: 'svg',
      loop: false,
      autoplay: false,
      path: '/animation/4.json',
    };

    animationFirstRef.current = lottie.loadAnimation(paramsOne);
    animationTwoRef.current = lottie.loadAnimation(paramsTwo);
    animationThirdRef.current = lottie.loadAnimation(paramsThree);
    animationFourRef.current = lottie.loadAnimation(paramsFour);
  }, []);

  const destroyAnimation = () => {
    animationFirstRef.current?.destroy();
    animationTwoRef.current?.destroy();
    animationThirdRef.current?.destroy();
    animationFourRef.current?.destroy();
  };

  const changeObserverParams = () => {
    const { clientHeight } = lottieRefFirst.current;
    const threshold = (window.screen.availHeight * 0.13) / clientHeight;
    console.log({threshold})
    setObserverParams({ threshold });
  };

  // const placeLottieWrapperOnContainer = () => {
  //   const sectionWidth = sectionRef.current.getBoundingClientRect().width;
  //   const right = (screen.availWidth - sectionWidth) / 2;
  //
  //   lottieWrapperRef.current.style.right = `${right}px`;
  // };

  useResizeObserver(document.documentElement, () => {
    changeObserverParams();
    // placeLottieWrapperOnContainer();
  });

  useEffect(() => {
    initAnimation();

    return () => {
      destroyAnimation();
    };
  }, [isDesktop]);

  useEffect(() => {
    changeObserverParams();
    // placeLottieWrapperOnContainer();
  }, []);

  useEffect(() => {
    if (sectionObserverOne?.isIntersecting) {
      console.log('play1');
      animationFirstRef.current.play();
    }
  }, [Boolean(sectionObserverOne?.isIntersecting)]);

  useEffect(() => {
    if (sectionObserverTwo?.isIntersecting) {
      console.log('play2');
      animationTwoRef.current.play();
    }
  }, [Boolean(sectionObserverTwo?.isIntersecting)]);

  useEffect(() => {
    if (sectionObserverThree?.isIntersecting) {
      console.log('play3');
      animationThirdRef.current.play();
    }
  }, [Boolean(sectionObserverThree?.isIntersecting)]);

  useEffect(() => {
    if (sectionObserverFour?.isIntersecting) {
      console.log('play4');
      animationFourRef.current.play();
    }
  }, [Boolean(sectionObserverFour?.isIntersecting)]);

  return (
    <>
      <div className="nft-checkout-block-animation-section">
        <div
          className="nft-checkout-block-animation-section__lottie-wrapper-first"
          ref={lottieRefFirst}
        ></div>
        <div
          className="nft-checkout-block-animation-section__lottie-wrapper-two"
          ref={lottieRefTwo}
        ></div>
        <div
          className="nft-checkout-block-animation-section__lottie-wrapper-third"
          ref={lottieRefThird}
        ></div>
        <div
          className="nft-checkout-block-animation-section__lottie-wrapper-four"
          ref={lottieRefFour}
        ></div>
      </div>
    </>
  );
};

export default NftCheckoutBlockAnimationSection;
