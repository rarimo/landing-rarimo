import './PartnersList.scss';

import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { getShiftedDelay, scaleImgDims } from '@/helpers';

const PartnersList = ({ titleKey, items, isImageOnly, className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(['partners-list', className])}>
      <h4
        className="partners-list__title container"
        data-aos="fade"
        data-aos-delay="500"
      >
        {t(titleKey)}
      </h4>
      <div className="partners-list__list-wrapper container partners-swiper">
        <ul className="partners-list__list swiper-wrapper">
          {items.map((item, index) => (
            <li className="swiper-slide" key={index}>
              <div
                className="partners-list__item"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay={getShiftedDelay(index)}
                data-aos-anchor-placement="top-bottom"
              >
                {isImageOnly ? (
                  <img
                    className="partners-list__item-image"
                    src={item.image}
                    width={scaleImgDims(item.width)}
                    height={scaleImgDims(item.height)}
                    alt=""
                  />
                ) : (
                  <>
                    <svg
                      className="partners-list__item-icon"
                      height="32"
                      width="32"
                    >
                      <use href={item.icon}></use>
                    </svg>
                    <span>{item.text}</span>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PartnersList;
