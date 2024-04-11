import './ProtocolSection.scss';

import { useTranslation } from 'react-i18next';

import { COMPONENT_NODE_IDS } from '@/const';
import useAppContext from '@/hooks/useAppContext';

import GlowingCard from '../GlowingCard';

const ProtocolSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();

  return (
    <section
      id={COMPONENT_NODE_IDS.protocolSection}
      className="protocol-section"
    >
      <div className="container">
        <div className="protocol-section__title-wrp" data-aos="fade-up">
          <h2 className="protocol-section__title">
            {t('protocol-section.title')}
          </h2>
          <p className="protocol-section__text">
            {t('protocol-section.description')}
          </p>
        </div>

        <GlowingCard className="protocol-section__content" data-aos="fade-up">
          <div className="protocol-section__img-wrp">
            <img
              className="protocol-section__img"
              src={
                isDesktop
                  ? '/img/home/protocol.webp'
                  : '/img/home/protocol-mobile.webp'
              }
              alt="Protocol Layer"
            />
          </div>
          <div className="protocol-section__list">
            <p className="protocol-section__list-item">
              {t('protocol-section.decentralized-item-txt')}
            </p>
            <p className="protocol-section__list-item">
              {t('protocol-section.pos-item-txt')}
            </p>
            <p className="protocol-section__list-item">
              {t('protocol-section.privacy-item-txt')}
            </p>
            <div className="protocol-section__list-item protocol-section__list-item--large">
              <span>{t('protocol-section.efficiency-item-txt')}</span>
              <div className="protocol-section__list-item-line" />
              <span className="protocol-section__list-sub-item">
                {t('protocol-section.aggregation-item-txt')}
              </span>
              <span className="protocol-section__list-sub-item">
                {t('protocol-section.replication-item-txt')}
              </span>
            </div>
          </div>
        </GlowingCard>
      </div>
    </section>
  );
};

export default ProtocolSection;
