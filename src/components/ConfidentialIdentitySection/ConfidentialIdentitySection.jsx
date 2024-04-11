import './ConfidentialIdentitySection.scss';

import GlowingCard from '../GlowingCard';

const ConfidentialIdentitySection = () => {
  return (
    <section className="confidential-identity-section">
      <div className="container">
        <h2 className="confidential-identity-section__title" data-aos="fade-up">
          How Confidential identity works
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
              Rarimo{' '}
              <span className="confidential-identity-section__block-text--accent">
                allows users to bring and attach any type of{' '}
              </span>
              identifier{' '}
              <span className="confidential-identity-section__block-text--accent">
                or{' '}
              </span>
              action{' '}
              <span className="confidential-identity-section__block-text--accent">
                to their{' '}
              </span>
              confidential graph.
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
              Users can verify{' '}
              <span className="confidential-identity-section__block-text--accent">
                hidden relationships{' '}
              </span>
              and{' '}
              <span className="confidential-identity-section__block-text--accent">
                actions{' '}
              </span>
              invisible to the public.
            </p>
          </GlowingCard>
          <GlowingCard
            className="confidential-identity-section__block confidential-identity-section__block--img"
            data-aos="fade-up"
          >
            <p className="confidential-identity-section__block-img-text">
              What you can prove
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
