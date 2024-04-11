import './GlowingCard.scss';

import cn from 'classnames';
import { memo } from 'react';

const GlowingCard = ({ children, className, ...rest }) => {
  return (
    <div className={cn(['glowing-card', className])} {...rest}>
      {children}
    </div>
  );
};

export default memo(GlowingCard);
