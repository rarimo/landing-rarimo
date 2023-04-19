import './TestnetDescSection.scss';

import { useTranslation } from 'react-i18next';

import { CONFIG } from '@/config';

const TestnetDescSection = () => {
  const { t } = useTranslation();

  return (
    <section className="testnet-desc-section container">
      <h4 className="testnet-desc-section__title" data-aos="zoom-in">
        {t('testnet-desc-section.title')}
      </h4>
      <p className="testnet-desc-section__description" data-aos="zoom-in">
        {t('testnet-desc-section.description')}
      </p>

      <h4
        className="testnet-desc-section__feedback"
        data-aos="zoom-in"
        data-aos-delay="400"
      >
        <span>{t('testnet-desc-section.feedback')}</span>{' '}
        <a
          className="testnet-desc-section__discord-link"
          href={CONFIG.discordLink}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          {t('testnet-desc-section.discord-link')}
        </a>
      </h4>
    </section>
  );
};

export default TestnetDescSection;
