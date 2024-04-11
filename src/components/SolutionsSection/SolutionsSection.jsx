import './SolutionsSection.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { COMPONENT_NODE_IDS } from '@/const';
import useAppContext from '@/hooks/useAppContext';
import useNavigation from '@/hooks/useNavigation';
import { useCasesList } from '@/template-data';

import GlowingCard from '../GlowingCard';

const SolutionsSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();
  const { handleNavClick } = useNavigation();

  return (
    <section
      id={COMPONENT_NODE_IDS.solutionsSection}
      className="solutions-section"
    >
      <div className="container">
        <div className="solutions-section__title-wrp" data-aos="fade-up">
          <h2 className="solutions-section__title">Solutions</h2>
          <p className="solutions-section__text">
            Enabling experiences beyond the capabilities of the traditional web.
          </p>
        </div>

        <div className="solutions-section__content">
          {isDesktop ? (
            <ul className="solutions-section__grid">
              {useCasesList.map(useCase => (
                <GlowingCard
                  key={useCase.modifier}
                  className={cn([
                    'solutions-section__case-item',
                    { 'solutions-section__case-item--big': useCase.isBig },
                  ])}
                  tag="li"
                  role="link"
                  tabIndex="0"
                  onClick={() => handleNavClick(useCase)}
                  onKeyDown={event => {
                    if (event.code === 'Enter') {
                      handleNavClick(useCase);
                    }
                  }}
                >
                  <img
                    className="solutions-section__case-item-img"
                    src={useCase.img}
                    alt=""
                  />
                  <p className="solutions-section__case-item-title">
                    {t(useCase.titleKey)}
                  </p>
                </GlowingCard>
              ))}
            </ul>
          ) : (
            <swiper-container
              class="solutions-section__cases-swiper"
              slides-per-view="auto"
              space-between="16"
              mousewheel-force-to-axis="true"
              autoplay="false"
              free-mode="false"
              resistance-ratio="0.5"
              grab-cursor="true"
              edge-swipe-detection="true"
              pagination="true"
              a11y-slide-role="listitem"
              a11y-container-role-description-message="Use cases list"
              item-role-description-message="Use case"
              data-aos="fade-up"
            >
              {useCasesList.map(useCase => (
                <swiper-slide
                  class="solutions-section__cases-swiper-slide"
                  key={useCase.modifier}
                >
                  <GlowingCard
                    key={useCase.modifier}
                    className={'solutions-section__case-item'}
                    tag="li"
                    role="link"
                    tabIndex="0"
                    onClick={() => handleNavClick(useCase)}
                    onKeyDown={event => {
                      if (event.code === 'Enter') {
                        handleNavClick(useCase);
                      }
                    }}
                  >
                    <img
                      className="solutions-section__case-item-img"
                      src={useCase.img}
                      alt=""
                    />
                    <p className="solutions-section__case-item-title">
                      {t(useCase.titleKey)}
                    </p>
                  </GlowingCard>
                </swiper-slide>
              ))}
            </swiper-container>
          )}
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;
