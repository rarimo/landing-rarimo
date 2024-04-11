import './ConfidentialIdentitySection.scss';

import { Trans, useTranslation } from 'react-i18next';

import GlowingCard from '../GlowingCard';

const ConfidentialIdentitySection = () => {
  const { t } = useTranslation();

  return (
    <section className="confidential-identity-section">
      <div className="container">
        <h2 className="confidential-identity-section__title" data-aos="fade-up">
          {t('confidential-identity-section.title')}
        </h2>
        <div className="confidential-identity-section__content">
          <GlowingCard
            className="confidential-identity-section__block"
            data-aos="fade-up"
          >
            <svg className="confidential-identity-section__block-icon">
              <use href="/icons/sprite.svg#icon-stacks"></use>
            </svg>
            <p className="confidential-identity-section__block-text">
              <Trans i18nKey="confidential-identity-section.graph-block" />
            </p>
          </GlowingCard>
          <GlowingCard
            className="confidential-identity-section__block"
            data-aos="fade-up"
          >
            <svg className="confidential-identity-section__block-icon">
              <use href="/icons/sprite.svg#icon-incognito"></use>
            </svg>
            <p className="confidential-identity-section__block-text">
              <Trans i18nKey="confidential-identity-section.verify-block" />
            </p>
          </GlowingCard>
          <GlowingCard
            className="confidential-identity-section__block confidential-identity-section__block--img"
            data-aos="fade-up"
          >
            <p className="confidential-identity-section__block-img-text">
              {t('confidential-identity-section.prove-msg')}
            </p>
            <div className="confidential-identity-section__block-img-wrp">
              <img
                className="confidential-identity-section__block-img"
                src="/img/home/confidential-identity.png"
                alt="Confidential Identity"
              />
            </div>
          </GlowingCard>
        </div>
      </div>
    </section>
  );
};

export default ConfidentialIdentitySection;
