import './BaseCard.scss';

import cn from 'classnames';

const BaseCard = ({ children, className, isSection = false, tag }) => {
  const CustomTag = tag || 'div';

  return (
    <CustomTag
      className={cn([
        'base-card',
        className,
        {
          'base-card--is-section': isSection,
        },
      ])}
    >
      <div className="base-card__bg-rect">
        <div className="base-card__content">
          <>{children}</>
        </div>
      </div>
    </CustomTag>
  );
};

export default BaseCard;
