import './NftCheckoutBlockAnimationSection.scss';

import { delay } from 'lodash-es';
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
  const [firstAnimationComplete, setFirstAnimationComplete] = useState(false);
  const [secondAnimationComplete, setSecondAnimationComplete] = useState(false);
  const [thirdAnimationComplete, setThirdAnimationComplete] = useState(false);

  const lottieRefFirst = useRef(null);
  const lottieRefTwo = useRef(null);
  const lottieRefThird = useRef(null);
  const lottieRefFour = useRef(null);
  const swiperRef = useRef(null);

  const observerParams = {
    threshold: 1,
  };
  const sectionObserverOne = useIntersection(lottieRefFirst, observerParams);
  const sectionObserverTwo = useIntersection(lottieRefTwo, observerParams);
  const sectionObserverThree = useIntersection(lottieRefThird, observerParams);
  const sectionObserverFour = useIntersection(lottieRefFour, observerParams);

  const nextSlide = () => {
    swiperRef.current?.swiper.slideNext();
  };

  const prevSlide = () => {
    swiperRef.current?.swiper.slidePrev();
  };

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
      if (!firstAnimationComplete) {
        animationFirstRef.current.setDirection(1);
        animationFirstRef.current.play();
        setFirstAnimationComplete(true);
      } else {
        animationFirstRef.current.setDirection(-1);
        animationFirstRef.current.play();
        setFirstAnimationComplete(false);
      }
    }
  }, [
    Boolean(sectionObserverOne?.isIntersecting),
    Boolean(sectionObserverTwo?.isIntersecting),
  ]);

  useEffect(() => {
    if (sectionObserverTwo?.isIntersecting) {
      if (!secondAnimationComplete) {
        animationTwoRef.current.setDirection(1);
        setSecondAnimationComplete(true);
      } else {
        animationTwoRef.current.setDirection(-1);
        setSecondAnimationComplete(false);
      }
      animationTwoRef.current.play();
    }
  }, [Boolean(sectionObserverTwo?.isIntersecting)]);

  useEffect(() => {
    if (sectionObserverThree?.isIntersecting) {
      if (!thirdAnimationComplete) {
        animationThirdRef.current.setDirection(1);
        setThirdAnimationComplete(true);
      } else {
        animationThirdRef.current.setDirection(-1);
        setThirdAnimationComplete(false);
      }
      animationThirdRef.current.play();
    }
  }, [Boolean(sectionObserverThree?.isIntersecting)]);

  useEffect(() => {
    if (sectionObserverFour?.isIntersecting) {
      animationFourRef.current.play();
    } else {
      animationFourRef.current.goToAndStop(0, true);
    }
  }, [Boolean(sectionObserverFour?.isIntersecting)]);

  useEffect(() => {
    const params = {
      nextButton: '.swiper-next',
      prevButton: '.swiper-prev',
      spaceBetween: 8,
      longSwipes: false,
      speed: 500,
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
              <h4 className="nft-checkout-block-animation-section__counter">
                <span>01</span>
                <span>/</span>
                <span className="nft-checkout-block-animation-section__counter--total">
                  04
                </span>
              </h4>
              <h3 className="nft-checkout-block-animation-section__title">
                {t('nft-checkout-steps-section.title-1')}
              </h3>
            </div>
          </swiper-slide>
          <swiper-slide className="nft-checkout-block-animation-section__swiper-slide">
            <div
              className="nft-checkout-block-animation-section__lottie-wrapper-two"
              ref={lottieRefTwo}
            ></div>
            <h4 className="nft-checkout-block-animation-section__counter">
              <span>02</span>
              <span>/</span>
              <span className="nft-checkout-block-animation-section__counter--total">
                04
              </span>
            </h4>
            <h3 className="nft-checkout-block-animation-section__title">
              {t('nft-checkout-steps-section.title-2')}
            </h3>
          </swiper-slide>
          <swiper-slide className="nft-checkout-block-animation-section__swiper-slide">
            <div
              className="nft-checkout-block-animation-section__lottie-wrapper-third"
              ref={lottieRefThird}
            ></div>
            <h4 className="nft-checkout-block-animation-section__counter">
              <span>03</span>
              <span>/</span>
              <span className="nnft-checkout-block-animation-section__counter--total">
                04
              </span>
            </h4>
            <h3 className="nft-checkout-block-animation-section__title">
              {t('nft-checkout-steps-section.title-3')}
            </h3>
          </swiper-slide>
          <swiper-slide className="nft-checkout-block-animation-section__swiper-slide">
            <div
              className="nft-checkout-block-animation-section__lottie-wrapper-four"
              ref={lottieRefFour}
            ></div>
            <h4 className="nft-checkout-block-animation-section__counter">
              <span>04</span>
              <span>/</span>
              <span className="nft-checkout-block-animation-section__counter--total">
                04
              </span>
            </h4>
            <h3 className="nft-checkout-steps-section__title">
              {t('nft-checkout-steps-section.title-4')}
            </h3>
          </swiper-slide>
        </swiper-container>
        <div className="nft-checkout-block-animation-section__swiper-pagination">
          <button
            className="nft-checkout-block-animation-section__swiper-pagination-btn-prev"
            onClick={prevSlide}
          >
            <svg
              className="nft-checkout-block-animation-section__swiper-pagination-btn-icon-prev"
              height="20"
              width="20"
              color={
                swiperRef.current?.swiper.activeIndex === 0 ? 'gray' : '#FFFFFF'
              }
            >
              <use href="/icons/sprite.svg#icon-arrow-right"></use>
            </svg>
          </button>
          <div className="nft-checkout-block-animation-section__swiper-pagination-bullet-wrapper">
            <div
              className={
                swiperRef.current?.swiper.activeIndex === 0
                  ? 'active-bullet nft-checkout-block-animation-section__swiper-pagination-bullet'
                  : 'nft-checkout-block-animation-section__swiper-pagination-bullet'
              }
            />
            <div
              className={
                swiperRef.current?.swiper.activeIndex === 1
                  ? 'active-bullet nft-checkout-block-animation-section__swiper-pagination-bullet'
                  : 'nft-checkout-block-animation-section__swiper-pagination-bullet'
              }
            />
            <div
              className={
                swiperRef.current?.swiper.activeIndex === 2
                  ? 'active-bullet nft-checkout-block-animation-section__swiper-pagination-bullet'
                  : 'nft-checkout-block-animation-section__swiper-pagination-bullet'
              }
            />
            <div
              className={
                swiperRef.current?.swiper.activeIndex === 3
                  ? 'active-bullet nft-checkout-block-animation-section__swiper-pagination-bullet'
                  : 'nft-checkout-block-animation-section__swiper-pagination-bullet'
              }
            />
          </div>
          <button
            className="nft-checkout-block-animation-section__swiper-pagination-btn-next"
            onClick={nextSlide}
          >
            <svg
              className="nft-checkout-block-animation-section__swiper-pagination-btn-icon-next"
              height="20"
              width="20"
              color={
                swiperRef.current?.swiper.activeIndex === 3 ? 'gray' : '#FFFFFF'
              }
            >
              <use href="/icons/sprite.svg#icon-arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default NftCheckoutBlockAnimationSection;
