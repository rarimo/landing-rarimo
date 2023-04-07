import './NftCheckoutHeroSection.scss';

import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import PrimaryVideoParallax from '@/components/PrimaryVideoParallax';
import AppButton from '@/components/AppButton';
import { CONFIG } from '@/config';
import { VIDEO_BG_COLOR } from '@/const';

const NftCheckoutHeroSection = () => {
  const { t } = useTranslation();
  const [typing, setTyping] = useState('');
  const isFirstRender = useRef(true);

  const typeText = data => {
    if (!isFirstRender.current) return;
    isFirstRender.current = false;

    let toRotate = data;
    let loopNum = 0;
    let period = 1500;
    let txt = '';
    let isDeleting = false;

    const tick = () => {
      const i = loopNum % toRotate.length;
      const fullTxt = toRotate[i];

      if (isDeleting) {
        txt = fullTxt.substring(0, txt.length - 1);
      } else {
        txt = fullTxt.substring(0, txt.length + 1);
      }

      setTyping(txt);

      let delta = 400 - Math.random() * 200;

      if (isDeleting) {
        delta /= 2;
      }

      if (!isDeleting && txt === fullTxt) {
        delta = period;
        isDeleting = true;
      } else if (isDeleting && !txt) {
        isDeleting = false;
        loopNum++;
        delta = 500;
      }

      setTimeout(function () {
        tick();
      }, delta);
    };

    tick();
  };

  useEffect(() => {
    const data = [
      t('nft-checkout-hero-section.title-easy-span'),
      t('nft-checkout-hero-section.title-instant-span'),
      t('nft-checkout-hero-section.title-atomic-span'),
    ];
    setTimeout(() => {
      typeText(data);
    }, 2000);
  }, []);

  return (
    <section className="nft-checkout-hero-section">
      <PrimaryVideoParallax type={VIDEO_BG_COLOR.blue} />

      <div className="nft-checkout-hero-section__content container">
        <h2
          className="nft-checkout-hero-section__title"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          {t('nft-checkout-hero-section.title')}
          <span className="nft-checkout-hero-section__title-span">
            {typing}
          </span>
        </h2>
        <h4 className="nft-checkout-hero-section__subtitle" data-aos="zoom-in">
          {t('nft-checkout-hero-section.subtitle')}
        </h4>
        <p
          className="nft-checkout-hero-section__description"
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          <Trans i18nKey="nft-checkout-hero-section.description_html" />
        </p>

        <div
          className="nft-checkout-hero-section__link-wrapper"
          data-aos="zoom-in"
          data-aos-delay="900"
        >
          <AppButton
            href={CONFIG.nftCheckoutDemoLink}
            textKey="nft-checkout-hero-section.try-demo-link"
          />
        </div>
      </div>
    </section>
  );
};

export default NftCheckoutHeroSection;
