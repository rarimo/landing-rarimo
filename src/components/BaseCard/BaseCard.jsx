import './BaseCard.scss';

import cn from 'classnames';
import { forwardRef } from 'react';

const BaseCard = forwardRef(
  ({ children, className, contentClassName, isSection = false, tag }, ref) => {
    const CustomTag = tag || 'div';

    return (
      <CustomTag
        ref={ref}
        className={cn([
          'base-card',
          className,
          {
            'base-card--is-section': isSection,
          },
        ])}
      >
        <div className="base-card__bg-rect">
          <div className={cn(['base-card__content', contentClassName])}>
            <>{children}</>
          </div>
        </div>
      </CustomTag>
    );
  },
);

export default BaseCard;
