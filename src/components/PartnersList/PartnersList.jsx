import './PartnersList.scss';

import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { getShiftedDelay } from '@/helpers';

const PartnersList = ({ titleKey, items, className }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(['partners-list', className])}>
      <h6
        className="partners-list__title overline"
        data-aos="fade"
        data-aos-delay="500"
      >
        {t(titleKey)}
      </h6>
      <ul className="partners-list__list" role="list">
        {items.map((item, index) => (
          <li
            key={index}
            className="partners-list__item"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay={getShiftedDelay(index)}
            data-aos-anchor-placement="top-bottom"
          >
            <svg className="partners-list__item-icon" height="28" width="28">
              <use href={item.icon}></use>
            </svg>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PartnersList;
