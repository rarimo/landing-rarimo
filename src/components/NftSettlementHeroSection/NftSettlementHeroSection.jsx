import './NftSettlementHeroSection.scss';

import { useEffect, useRef, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import PrimaryVideoParallax from '@/components/PrimaryVideoParallax';
import AppLink from '@/components/AppLink';
import { CONFIG } from '@/config';
import { VIDEO_BG_COLOR } from '@/const';

const NftSettlementHeroSection = () => {
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

      let delta = 600 - Math.random() * 300;

      if (isDeleting) {
        delta /= 2;
      }

      if (!isDeleting && txt === fullTxt && i !== toRotate.length - 1) {
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
      t('nft-settlement-hero-section.title-from-span'),
      t('nft-settlement-hero-section.title-to-span'),
    ];
    setTimeout(() => {
      typeText(data);
    }, 2000);
  }, []);

  return (
    <section className="nft-settlement-hero-section">
      <PrimaryVideoParallax type={VIDEO_BG_COLOR.blue} />

      <div className="nft-settlement-hero-section__content container">
        <h2
          className="nft-settlement-hero-section__title"
          data-aos="zoom-in"
          data-aos-delay="300"
        >
          {t('nft-settlement-hero-section.title')}
          <span className="nft-settlement-hero-section__title-span">
            {typing}
          </span>
        </h2>
        <h4
          className="nft-settlement-hero-section__subtitle"
          data-aos="zoom-in"
        >
          {t('nft-settlement-hero-section.subtitle')}
        </h4>
        <p
          className="nft-settlement-hero-section__description"
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          <Trans i18nKey="nft-settlement-hero-section.description_html" />
        </p>

        <div
          className="nft-settlement-hero-section__link-wrapper"
          data-aos="zoom-in"
          data-aos-delay="900"
        >
          <AppLink
            href={CONFIG.nftSettlementDemoLink}
            isPrimaryScheme
            textKey="nft-settlement-hero-section.try-demo-link"
          />
        </div>
      </div>
    </section>
  );
};

export default NftSettlementHeroSection;
