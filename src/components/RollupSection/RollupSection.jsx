import './RollupSection.scss';

import { useTranslation } from 'react-i18next';

import { COMPONENT_NODE_IDS } from '@/const';
import useAppContext from '@/hooks/useAppContext';

import GlowingCard from '../GlowingCard';

const RollupSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  return (
    <section id={COMPONENT_NODE_IDS.rollupSection} className="rollup-section">
      <div className="container">
        <div className="rollup-section__title-wrp" data-aos="fade-up">
          <h2 className="rollup-section__title">{t('rollup-section.title')}</h2>
          <p className="rollup-section__text">
            {t('rollup-section.description')}
          </p>
        </div>

        <GlowingCard className="rollup-section__content" data-aos="fade-up">
          <img
            className="rollup-section__img"
            src={
              isDesktop
                ? '/img/home/rollup.webp'
                : '/img/home/rollup-mobile.webp'
            }
            alt="L2 rollup"
          />
        </GlowingCard>
      </div>
    </section>
  );
};

export default RollupSection;
