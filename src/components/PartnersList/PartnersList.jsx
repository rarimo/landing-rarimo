import './PartnersList.scss';

import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const PartnersList = ({ titleKey, items, className, ...rest }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(['partners-list', className])} {...rest}>
      <h5 className="overline">{t(titleKey)}</h5>
      <ul className="partners-list__list">
        {items.map((item, index) => (
          <li key={index} className="partners-list__item">
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
