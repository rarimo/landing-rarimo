import './SectionWrapper.scss';

import cn from 'classnames';

export const SECTION_WRAPPER_SCHEME = {
  primary: 'primary',
  accent: 'accent',
  yellowAccent: 'yellow-accent',
};

const SCHEMES = {
  [SECTION_WRAPPER_SCHEME.primary]: {
    rectColor: 'var(--col-white-min-alpha)',
    bgColor: 'var(--primary-bg-color)',
  },
  [SECTION_WRAPPER_SCHEME.accent]: {
    rectColor: 'var(--col-black-min-alpha)',
    bgColor: 'var(--accent-bg-color)',
  },
  [SECTION_WRAPPER_SCHEME.yellowAccent]: {
    rectColor: 'var(--col-black-min-alpha)',
    bgColor: 'var(--yellow-accent-bg-color)',
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
        '--section-wrapper-bg-color': SCHEMES[scheme].rectColor,
        backgroundColor: SCHEMES[scheme].bgColor,
      }}
    >
      {children}
    </div>
  );
};

export default SectionWrapper;
