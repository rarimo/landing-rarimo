import './UseCasesSection.scss';

import cn from 'classnames';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import BaseCard from '@/components/BaseCard';
import { COMPONENT_NODE_IDS, ROUTES_PATHS } from '@/const';
import useAppContext from '@/hooks/useAppContext';
import useNavigation from '@/hooks/useNavigation';
import UiSwiper from '@/swiper/UiSwiper';
import { useCasesList } from '@/template-data';

const UseCasesSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();
  const { handleNavClick } = useNavigation();
  const activateSlide = index => {
    console.log('a');
    // // if (this._isEngaged) return;
    // //
    // const MINIMUM_VIEWS_PER_SLIDE = 2;
    //
    // this._activatedSlides[index]++;
    //
    // const views = this._activatedSlides.slice(1);
    // if (!views.includes(0) && views.some(v => v >= MINIMUM_VIEWS_PER_SLIDE)) {
    //   trackEvent('Browsed images on a lot card', { lotId: this.lot.id });
    //   this._isEngaged = true;
    // }
  };

  return (
    <section
      id={COMPONENT_NODE_IDS.useCasesSection}
      className="use-cases-section"
    >
      <div className="container">
        <div className="use-cases-section__title-wrapper" data-aos="fade-up">
          <h5 className="use-cases-section__title">
            {t('use-cases-section.title')}
          </h5>
          <div className="use-cases-section__share-wrapper">
            <span>{t('use-cases-section.share-text')}</span>
            <Link
              className="use-cases-section__share-link"
              to={ROUTES_PATHS.testnetSignUp}
            >
              {t('use-cases-section.share-link')}
            </Link>
          </div>
        </div>
        {isDesktop ? (
          <ul className="use-cases-section__grid">
            {useCasesList.map(useCase => (
              <BaseCard
                key={useCase.modifier}
                className={cn([
                  'use-cases-section__case-item',
                  `use-cases-section__case-item--${useCase.modifier}`,
                  {
                    'use-cases-section__case-item--big': useCase.isBig,
                    'use-cases-section__case-item--yellow': useCase.isYellow,
                  },
                ])}
                tag="li"
                role="link"
                tabIndex="0"
                onClick={() => handleNavClick(useCase)}
                onKeyDown={event => {
                  switch (event.code) {
                    case 'Enter':
                      handleNavClick(useCase);
                      return;

                    default:
                      return;
                  }
                }}
              >
                <img
                  className="use-cases-section__case-item-img"
                  src={useCase.img}
                  alt=""
                />
                <div className="use-cases-section__case-item-content">
                  <h6 className="use-cases-section__case-item-title">
                    {t(useCase.titleKey)}
                  </h6>
                  <p className="use-cases-section__case-item-text">
                    {t(useCase.textKey)}
                  </p>
                </div>
              </BaseCard>
            ))}
          </ul>
        ) : (
          <UiSwiper
            class="use-cases-section__cases-swiper"
            slideIndexActivated={activateSlide}
            useCases={useCasesList}
            data-aos="fade-up"
          ></UiSwiper>
        )}
      </div>
    </section>
  );
};

export default UseCasesSection;
