import './BaseCardList.scss';

import { Children, cloneElement } from 'react';
import cn from 'classnames';
import { getShiftedDelay } from '@/helpers';

const BaseCardList = ({ children, className }) => (
  <ul className={cn(['base-card-list', className])}>
    {Children.map(children, child => {
      const index = child.key;
      return (
        <li
          className={child.props.className}
          key={index}
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay={getShiftedDelay(index, 300)}
          data-aos-anchor-placement="top-bottom"
        >
          {cloneElement(child, {
            className: 'base-card-list__card',
          })}
        </li>
      );
    })}
  </ul>
);

export default BaseCardList;
