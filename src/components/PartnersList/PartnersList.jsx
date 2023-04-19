import './PartnersList.scss';

import { useTranslation } from 'react-i18next';
import cn from 'classnames';

const PartnersList = ({ titleKey, items, className, ...rest }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(['partners-list', className])} {...rest}>
      <h6 className="overline">{t(titleKey)}</h6>
      <ul className="partners-list__list" role="list">
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
