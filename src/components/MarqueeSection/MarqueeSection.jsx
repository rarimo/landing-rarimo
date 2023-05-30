import './MarqueeSection.scss';

import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

const MarqueeSection = () => {
  const { t } = useTranslation();

  return (
    <section className="marquee-section">
      <div className="marquee-section__content container">
        <Marquee speed={100} gradient={false}>
          <h2 className="marquee-section__title">
            {t('marquee-section.marquee')}
          </h2>
          <svg height="8" width="8">
            <use href="/icons/sprite.svg#icon-rect"></use>t
          </svg>
        </Marquee>
      </div>
    </section>
  );
};

export default MarqueeSection;
