import './NftCheckoutHeroSection.scss';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import AppButton, { APP_BUTTON_SCHEMES } from '@/components/AppButton';
import PartnersList from '@/components/PartnersList';
import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS } from '@/const';
import useAppContext from '@/hooks/useAppContext';
import { supportedBlockchainsList } from '@/template-data';

const NftCheckoutHeroSection = () => {
  const { t } = useTranslation();
  const squareOne = useRef(null);
  const squareTwo = useRef(null);
  const heroSection = useRef(null);
  const light = useRef(null);
  const { isDesktop } = useAppContext();
  let translateY = 0;
  let opacity = 100;
  let prevWindowScroll = window.scrollY;
  useEffect(() => {
    const heightHeroSection =
      heroSection.current.getBoundingClientRect().height / 2;
    let onScroll = () => {
      if (!isDesktop) return;
      if (window.scrollY > heightHeroSection) {
        translateY =
          translateY > 0 ? translateY - (window.scrollY - prevWindowScroll) : 0;
        opacity =
          window.scrollY - prevWindowScroll > 0 ? opacity - 1 : opacity + 1;
      } else {
        translateY =
          translateY >= 0
            ? translateY + (window.scrollY - prevWindowScroll)
            : 0;
        opacity = 100;
      }
      prevWindowScroll = window.scrollY;
      squareOne.current.style.transform = `translateY(${translateY}px)`;
      squareTwo.current.style.transform = `translateY(${translateY}px)`;
      squareOne.current.style.opacity = `${opacity}%`;
      squareTwo.current.style.opacity = `${opacity}%`;
    };
    let highlight = ({ pageX, pageY }) => {
      const x = pageX;
      const y = pageY;
      const spotlightSize = 'transparent 80px, rgba(0, 0, 0, 0.8) 200px)';
      if (light.current) {
        light.current.style.background = `radial-gradient(circle at ${x}px ${y}px, ${spotlightSize}`;
      }
    };
    document.addEventListener('mousemove', highlight);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      onScroll = null;
      window.removeEventListener('mousemove', highlight);
      highlight = null;
    };
  }, []);

  return (
    <section
      id={COMPONENT_NODE_IDS.heroSection}
      ref={heroSection}
      className="nft-checkout-hero-section"
    >
      <div className="nft-checkout-hero-section__inner">
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
          <div
            ref={squareOne}
            className="nft-checkout-hero-section__square-one"
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="150"
          />
          <div
            ref={squareTwo}
            data-aos="fade-up"
            data-aos-easing="linear"
            data-aos-duration="150"
            className="nft-checkout-hero-section__square-two"
          />
        </div>
        <div className="nft-checkout-hero-section__highlight-bgImageFirst" />
        <div
          className="nft-checkout-hero-section__highlight-bgImageSecond"
          ref={light}
        />
      </div>
    </section>
  );
};

export default NftCheckoutHeroSection;
