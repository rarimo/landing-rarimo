import './SolutionsSection.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { COMPONENT_NODE_IDS } from '@/const';
import useAppContext from '@/hooks/useAppContext';
import useNavigation from '@/hooks/useNavigation';
import { solutionsList } from '@/template-data';

import GlowingCard from '../GlowingCard';

const SolutionsSection = () => {
  const { t } = useTranslation();
  const { isDesktop } = useAppContext();
  const { handleNavClick } = useNavigation();

  return (
    <section
      id={COMPONENT_NODE_IDS.solutionsSection}
      className="solutions-section container"
    >
      <div className="solutions-section__title-wrp" data-aos="fade-up">
        <h2 className="solutions-section__title">
          {t('solutions-section.title')}
        </h2>
        <p className="solutions-section__text">
          {t('solutions-section.description')}
        </p>
      </div>

      <div className="solutions-section__content" data-aos="fade-up">
        {isDesktop ? (
          <ul className="solutions-section__grid">
            {solutionsList.map(solution => (
              <GlowingCard
                key={solution.modifier}
                className={cn([
                  'solutions-section__case-item',
                  { 'solutions-section__case-item--big': solution.isBig },
                ])}
                tag="li"
                role="link"
                tabIndex="0"
                onClick={() => handleNavClick(solution)}
                onKeyDown={event => {
                  if (event.code === 'Enter') {
                    handleNavClick(solution);
                  }
                }}
              >
                <img
                  className="solutions-section__case-item-img"
                  src={solution.img}
                  alt=""
                />
                <p className="solutions-section__case-item-title">
                  {t(solution.titleKey)}
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
            a11y-container-role-description-message="Solutions list"
            item-role-description-message="Solution"
            data-aos="fade-up"
          >
            {solutionsList.map(solution => (
              <swiper-slide
                class="solutions-section__cases-swiper-slide"
                key={solution.modifier}
              >
                <GlowingCard
                  key={solution.modifier}
                  className={'solutions-section__case-item'}
                  tag="li"
                  role="link"
                  tabIndex="0"
                  onClick={() => handleNavClick(solution)}
                  onKeyDown={event => {
                    if (event.code === 'Enter') {
                      handleNavClick(solution);
                    }
                  }}
                >
                  <img
                    className="solutions-section__case-item-img"
                    src={solution.img}
                    alt=""
                  />
                  <p className="solutions-section__case-item-title">
                    {t(solution.titleKey)}
                  </p>
                </GlowingCard>
              </swiper-slide>
            ))}
          </swiper-container>
        )}
      </div>
    </section>
  );
};

export default SolutionsSection;
