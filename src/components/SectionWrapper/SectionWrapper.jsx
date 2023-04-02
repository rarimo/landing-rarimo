import './SectionWrapper.scss';

import cn from 'classnames';

export const SECTION_WRAPPER_SCHEME = {
  primary: 'primary',
  accent: 'accent',
};

const SCHEMES = {
  [SECTION_WRAPPER_SCHEME.primary]: {
    image: '/img/bg/black-rect.png',
    color: 'var(--primary-bg-color)',
  },
  [SECTION_WRAPPER_SCHEME.accent]: {
    image: '/img/bg/green-rect.png',
    color: 'var(--accent-bg-color)',
  },
};

const SectionWrapper = ({
  children,
  className,
  scheme = SECTION_WRAPPER_SCHEME.primary,
}) => {
  return (
    <div
      className={cn(['section-wrapper', className])}
      style={{
        backgroundImage: `url(${SCHEMES[scheme].image})`,
        backgroundColor: SCHEMES[scheme].color,
      }}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
