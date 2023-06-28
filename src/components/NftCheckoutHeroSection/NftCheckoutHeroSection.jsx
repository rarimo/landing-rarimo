import './NftCheckoutHeroSection.scss';

import { throttle } from 'lodash-es';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import PartnersList from '@/components/PartnersList';
import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS } from '@/const';
import useAppContext from '@/hooks/useAppContext';
import { supportedBlockchainsList } from '@/template-data';

let onScroll;
let onMousemove;
let sectionRect;

const NftCheckoutHeroSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  const squareOne = useRef(null);
  const squareTwo = useRef(null);
  const heroSection = useRef(null);
  const spotlightRef = useRef(null);
  const lastScrollPositionRef = useRef(0);

  const squareParallax = () => {
    if (!squareOne.current || !squareTwo.current) return;

    const currentScrollPosition = window.scrollY;
    let translateY = 0;
    let opacity = 100;

    if (currentScrollPosition > sectionRect.height / 2) {
      translateY =
        translateY > 0
          ? translateY - (currentScrollPosition - lastScrollPositionRef.current)
          : 0;
      opacity =
        currentScrollPosition - lastScrollPositionRef.current > 0
          ? opacity - 1
          : opacity + 1;
    } else {
      translateY =
        translateY >= 0
          ? translateY + (currentScrollPosition - lastScrollPositionRef.current)
          : 0;
      opacity = 100;
    }

    lastScrollPositionRef.current = currentScrollPosition;

    squareOne.current.style.transform = `translateY(${translateY}px)`;
    squareTwo.current.style.transform = `translateY(${translateY}px)`;
    squareOne.current.style.opacity = `${opacity}%`;
    squareTwo.current.style.opacity = `${opacity}%`;
  };

  useEffect(() => {
    const removeListeners = () => {
      window.removeEventListener('scroll', onScroll, { passive: true });
      onScroll = null;
      window.removeEventListener('mousemove', onMousemove);
    };

    if (isDesktop) {
      sectionRect = heroSection.current.getBoundingClientRect();

      onScroll = throttle(squareParallax, 15);
      const onMousemove = ({ pageX, pageY }) => {
        if (!spotlightRef.current || window.scrollY > sectionRect.height)
          return;

        const x = pageX;
        const y = pageY;
        const spotlightSize = 'transparent 80px, rgba(0, 0, 0, 0.8) 200px)';

        spotlightRef.current.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, ${spotlightSize}`;
      };

      window.addEventListener('scroll', onScroll, { passive: true });
      document.addEventListener('mousemove', onMousemove);
      return;
    }

    if (!isDesktop) {
      removeListeners();
    }

    return () => {
      removeListeners();
    };
  }, [isDesktop]);

  return (
    <section
      id={COMPONENT_NODE_IDS.heroSection}
      ref={heroSection}
      className="nft-checkout-hero-section"
    >
      <div className="nft-checkout-hero-section__content container">
        <h1 className="nft-checkout-hero-section__title">
          <span className="js-character-animation">
            {t('nft-checkout-hero-section.title')}
          </span>
        </h1>
        <p
          className="nft-checkout-hero-section__description"
          data-aos="fade-up"
        >
          {t('nft-checkout-hero-section.description')}
        </p>
        <PartnersList
          className="nft-checkout-hero-section__blockchains"
          titleKey="nft-checkout-hero-section.blockchains-title"
          items={supportedBlockchainsList}
          data-aos="fade-up"
        />
        <div
          className="nft-checkout-hero-section__links-wrapper"
          data-aos="fade-up"
        >
          <AppButton
            className="nft-checkout-hero-section__link"
            href={CONFIG.nftCheckoutDocsLink}
          >
            <span>{t('nft-checkout-hero-section.docs-link')}</span>
            <svg
              className="nft-checkout-hero-section__link-icon"
              height="13"
              width="13"
            >
              <use href="/icons/sprite.svg#icon-arrow-right"></use>
            </svg>
          </AppButton>
          <AppButton
            className="nft-checkout-hero-section__link"
            href={CONFIG.nftCheckoutDemoLink}
            scheme={APP_BUTTON_SCHEMES.secondary}
            textKey="nft-checkout-hero-section.demo-link"
          />
        </div>
        <img
          src="/img/nft-checkout-page/alchemy.png"
          height="35"
          width="160"
          alt=""
          data-aos="fade-up"
        />
        {isDesktop && (
          <>
            <div
              ref={squareOne}
              className="nft-checkout-hero-section__square-one"
            />
            <div
              ref={squareTwo}
              className="nft-checkout-hero-section__square-two"
            />
          </>
        )}
      </div>
      <div className="nft-checkout-hero-section__bg-rect-backdrop" />
      {isDesktop && (
        <div
          ref={spotlightRef}
          className="nft-checkout-hero-section__spotlight"
        />
      )}
    </section>
  );
};

export default NftCheckoutHeroSection;
