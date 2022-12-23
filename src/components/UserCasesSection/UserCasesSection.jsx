import './UserCasesSection.scss';

import { useTranslation } from 'react-i18next';
import AppLink from '@/components/AppLink';
import PartnersList from '@/components/PartnersList';
import { backersList } from '@/template-data';

const UserCasesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="user-cases-section" className="user-cases-section">
      <h3 className="user-cases-section__title container" data-aos="fade-right">
        {t('user-cases-section.title')}
      </h3>
      <p
        className="user-cases-section__subtitle container"
        data-aos="fade-right"
        data-aos-delay="400"
      >
        {t('user-cases-section.subtitle')}
      </p>
      <div className="container">
        <div className="user-cases-section__card-list-wrapper user-cases-swiper">
          <button
            className="user-cases-section__list-nav-btn user-cases-section__list-nav-btn--prev"
            type="button"
          >
            <svg height="16" width="16">
              <use href="/sprite.svg#icon-arrow-right"></use>
            </svg>
          </button>
          <button
            className="user-cases-section__list-nav-btn user-cases-section__list-nav-btn--next"
            type="button"
          >
            <svg height="16" width="16">
              <use href="/sprite.svg#icon-arrow-right"></use>
            </svg>
          </button>
          <ul className="user-cases-section__card-list swiper-wrapper">
            <li className="user-cases-section__card user-cases-section__card--nft-settlement swiper-slide">
              <img
                className="user-cases-section__card-img"
                src="/img/user-cases-section/nft-settlement-img.png"
                height="150"
                loading="lazy"
                alt="NFT Settlement"
              />
              <h4 className="user-cases-section__card-title">
                {t('user-cases-section.nft-settlement-title')}
              </h4>
              <p className="user-cases-section__card-text">
                {t('user-cases-section.nft-settlement-text')}
              </p>
              <AppLink
                className="user-cases-section__card-link"
                href="#"
                isPrimaryScheme
                textKey="user-cases-section.nft-settlement-btn"
              />
            </li>
            <li className="user-cases-section__card user-cases-section__card--asset-verification swiper-slide">
              <img
                className="user-cases-section__card-img"
                src="/img/user-cases-section/asset-verification-img.png"
                height="150"
                loading="lazy"
                alt="Asset Verification"
              />
              <h4 className="user-cases-section__card-title">
                {t('user-cases-section.asset-verification-title')}
              </h4>
              <p className="user-cases-section__card-text">
                {t('user-cases-section.asset-verification-text')}
              </p>
            </li>
            <li className="user-cases-section__card user-cases-section__card--borrowing swiper-slide">
              <img
                className="user-cases-section__card-img"
                src="/img/user-cases-section/borrowing-img.png"
                height="150"
                loading="lazy"
                alt="Lending & Borrowing"
              />
              <h4 className="user-cases-section__card-title">
                {t('user-cases-section.borrowing-title')}
              </h4>
              <p className="user-cases-section__card-text">
                {t('user-cases-section.borrowing-text')}
              </p>
            </li>
            <li className="user-cases-section__card user-cases-section__card--airdrop swiper-slide">
              <img
                className="user-cases-section__card-img"
                src="/img/user-cases-section/airdrop-img.png"
                height="150"
                loading="lazy"
                alt="Multichain Airdrop"
              />
              <h4 className="user-cases-section__card-title">
                {t('user-cases-section.airdrop-title')}
              </h4>
              <p className="user-cases-section__card-text">
                {t('user-cases-section.airdrop-text')}
              </p>
            </li>
            <li className="user-cases-section__card user-cases-section__card--staking swiper-slide">
              <img
                className="user-cases-section__card-img"
                src="/img/user-cases-section/staking-img.png"
                height="150"
                loading="lazy"
                alt="Staking aggregator"
              />
              <h4 className="user-cases-section__card-title">
                {t('user-cases-section.staking-title')}
              </h4>
              <p className="user-cases-section__card-text">
                {t('user-cases-section.staking-text')}
              </p>
            </li>
            <li className="user-cases-section__card user-cases-section__card--share swiper-slide">
              <div className="user-cases-section__card--centered">
                <div className="user-cases-section__card-edit-icon-wrapper">
                  <svg height="32" width="32">
                    <use href="/sprite.svg#icon-edit"></use>
                  </svg>
                </div>
                <h4 className="user-cases-section__card-title">
                  {t('user-cases-section.share-title')}
                </h4>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <PartnersList
        isImageOnly
        titleKey="user-cases-section.backers-title"
        items={backersList}
      />
    </section>
  );
};

export default UserCasesSection;