import './SectionCard.scss';

import cn from 'classnames';

const SectionCard = ({ children, className }) => {
  return (
    <div className={cn(['section-card', className])}>
      <div className="section-card__bg-rect">
        <div className="section-card__content">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SectionCard;
