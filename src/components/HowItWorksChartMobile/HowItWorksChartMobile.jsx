import './HowItWorksChartMobile.scss';

import cn from 'classnames';

const HowItWorksChartMobile = ({ isVisibleOnScreen }) => {
  return (
    <svg
      className={cn([
        'how-it-works-chart-mobile',
        {
          'how-it-works-chart-mobile--paused': !isVisibleOnScreen,
        },
      ])}
      width="2"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="how-it-works-chart-mobile__line-path how-it-works-chart-mobile__back-line"
        d="M1 0L1 1000"
      />
      <path
        className="how-it-works-chart-mobile__line-path how-it-works-chart-mobile__front-line--animation how-it-works-chart-mobile__front-line"
        d="M1 0L1 1000"
      />
    </svg>
  );
};

export default HowItWorksChartMobile;
