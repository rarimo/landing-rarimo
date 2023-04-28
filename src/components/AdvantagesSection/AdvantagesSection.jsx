import './AdvantagesSection.scss';

import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BaseCardList from '@/components/BaseCardList';
import PartnersList from '@/components/PartnersList';
import { advantagesList, supportedFTList } from '@/template-data';

const AdvantagesSection = () => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef();

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
    setIsPlaying(prev => !prev);
  };

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <section className="advantages-section">
      <div
        className="advantages-section__video-wrapper container"
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
      >
        <button
          className={cn([
            'advantages-section__video-play-btn',
            {
              'advantages-section__video-play-btn--hidden': isPlaying,
            },
          ])}
          onClick={togglePlay}
        >
          <svg
            className="advantages-section__video-play-icon"
            height="24"
            width="24"
          >
            <use href="/icons/sprite.svg#icon-play"></use>
          </svg>
        </button>

        <img
          className="advantages-section__browser-toolbar-img"
          src="/img/nft-checkout-page/browser-toolbar.png"
          width="100%"
          loading="lazy"
          alt=""
        />
        <video
          ref={videoRef}
          className="advantages-section__browser-video"
          muted
          loop
          playsInline
          width="100%"
          onClick={togglePlay}
        >
          <source src="/video/nft-checkout-demo.webm" type="video/webm" />
          <source src="/video/nft-checkout-demo.mp4" type="video/mp4" />
        </video>
      </div>

      <PartnersList
        className="advantages-section__partners"
        centered
        titleKey="advantages-section.supported-ft-title"
        items={supportedFTList}
      />

      <BaseCardList className="container">
        {advantagesList.map((item, index) => (
          <div key={index}>
            <svg
              className="advantages-section__card-icon"
              height="32"
              width="32"
            >
              <use href={item.icon}></use>
            </svg>
            <h5 className="advantages-section__card-title">
              {t(item.titleKey)}
            </h5>
            <p className="advantages-section__card-text">{t(item.textKey)}</p>
          </div>
        ))}
      </BaseCardList>
    </section>
  );
};

export default AdvantagesSection;
