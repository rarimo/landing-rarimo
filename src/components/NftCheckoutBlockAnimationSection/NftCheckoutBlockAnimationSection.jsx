import './NftCheckoutBlockAnimationSection.scss';

import lottie from 'lottie-web';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useIntersection } from 'react-use';

import useAppContext from '@/hooks/useAppContext';

const NftCheckoutBlockAnimationSection = () => {
  const { t } = useTranslation();
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
  const swiperRef = useRef(null);

  const [observerParams, setObserverParams] = useState({
    threshold: 1,
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

  useEffect(() => {
    initAnimation();

    return () => {
      destroyAnimation();
    };
  }, [isDesktop]);

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

  useEffect(() => {
    const params = {
      nextButton: '.swiper-next',
      prevButton: '.swiper-prev',
      spaceBetween: 8,
      longSwipes: false,
      speed: 1200,
      pagination: {
        clickable: true,
      },
      a11y: {
        slideRole: 'listitem',
        containerRoleDescriptionMessage: 'NFT Checkout flow',
        itemRoleDescriptionMessage: 'NFT Checkout step',
      },
    };

    Object.assign(swiperRef.current, params);

    swiperRef.current.initialize();
  }, []);

  return (
    <>
      <div className="nft-checkout-block-animation-section">
        <swiper-container
          ref={swiperRef}
          className="nft-checkout-block-animation-section__swiper-container"
          init="false"
          style={{ height: '100%' }}
        >
          <swiper-slide className="nft-checkout-block-animation-section__swiper-slide">
            <div
              className="nft-checkout-block-animation-section__lottie-wrapper-first"
              ref={lottieRefFirst}
            ></div>
            <div
              className="nft-checkout-block-animation-section__swiper-slide-content"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <h4 className="nft-checkout-steps-section__counter">
                <span>01</span>
                <span>/</span>
                <span className="nft-checkout-steps-section__counter--total">
                  04
                </span>
              </h4>
              <h3 className="nft-checkout-steps-section__title">
                {t('nft-checkout-steps-section.title-1')}
              </h3>
            </div>
          </swiper-slide>
          <swiper-slide className="nft-checkout-block-animation-section__swiper-slide">
            <div
              className="nft-checkout-block-animation-section__lottie-wrapper-two"
              ref={lottieRefTwo}
            ></div>
            <h4 className="nft-checkout-steps-section__counter">
              <span>02</span>
              <span>/</span>
              <span className="nft-checkout-steps-section__counter--total">
                04
              </span>
            </h4>
            <h3 className="nft-checkout-steps-section__title">
              {t('nft-checkout-steps-section.title-2')}
            </h3>
          </swiper-slide>
          <swiper-slide className="nft-checkout-block-animation-section__swiper-slide">
            <div
              className="nft-checkout-block-animation-section__lottie-wrapper-third"
              ref={lottieRefThird}
            ></div>
            <h4 className="nft-checkout-steps-section__counter">
              <span>03</span>
              <span>/</span>
              <span className="nft-checkout-steps-section__counter--total">
                04
              </span>
            </h4>
            <h3 className="nft-checkout-steps-section__title">
              {t('nft-checkout-steps-section.title-3')}
            </h3>
          </swiper-slide>
          <swiper-slide className="nft-checkout-block-animation-section__swiper-slide">
            <div
              className="nft-checkout-block-animation-section__lottie-wrapper-four"
              ref={lottieRefFour}
            ></div>
            <h4 className="nft-checkout-steps-section__counter">
              <span>04</span>
              <span>/</span>
              <span className="nft-checkout-steps-section__counter--total">
                04
              </span>
            </h4>
            <h3 className="nft-checkout-steps-section__title">
              {t('nft-checkout-steps-section.title-4')}
            </h3>
          </swiper-slide>
        </swiper-container>
      </div>
    </>
  );
};

export default NftCheckoutBlockAnimationSection;
