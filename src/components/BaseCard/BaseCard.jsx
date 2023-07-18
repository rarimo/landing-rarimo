import './BaseCard.scss';

import cn from 'classnames';
import { forwardRef, memo } from 'react';

const BaseCard = forwardRef(
  (
    { children, className, contentClassName, isSection = false, tag, ...rest },
    ref,
  ) => {
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
        {...rest}
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

export default memo(BaseCard);
