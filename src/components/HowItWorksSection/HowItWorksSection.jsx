import './HowItWorksSection.scss';

import { useTranslation } from 'react-i18next';

const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <section className="how-it-works-section container">
      <div className="how-it-works-section__chart-wrapper">
        <div className="how-it-works-section__chart">
          <div className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.first')}
          </div>
          <div className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.second')}
          </div>
          <div className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.third')}
          </div>
          <div className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.fourth')}
          </div>
          <div className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.fifth')}
          </div>
          <div className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.sixth')}
          </div>
          <div className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.seventh')}
          </div>
        </div>
        <svg
          className="how-it-works-section__chart-lines"
          height="100%"
          width="100%"
        >
          <defs>
            {/* <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"> */}
            <linearGradient id="linear" x1="0">
              {/* <stop offset="0%" stop-color="#05a" />
              <stop offset="100%" stop-color="#0a5" /> */}
              <stop offset="50%" stop-color="#181B1C">
                {/* <animate
                  attributeName="stop-color"
                  values="#181B1C; #181B1C; #82CFE2"
                  dur="10s"
                  repeatCount="indefinite"
                ></animate> */}
              </stop>
              <stop offset="50%" stop-color="#181B1C">
                <animate
                  attributeName="x1"
                  //   values="0%; 100%"
                  from="-100%"
                  to="100%"
                  dur="10s"
                  repeatCount="indefinite"
                ></animate>
              </stop>
              <stop offset="50%" stop-color="#82CFE2">
                <animate
                  attributeName="x1"
                  //   values="0%; 100%"
                  from="-100%"
                  to="100%"
                  dur="10s"
                  repeatCount="indefinite"
                ></animate>
              </stop>

              <stop offset="100%" stop-color="#82CFE2">
                {/* <animate
                  attributeName="stop-color"
                  values="#181B1C; #82CFE2; #82CFE2"
                  dur="4s"
                  repeatCount="indefinite"
                ></animate> */}
              </stop>
            </linearGradient>
          </defs>
          {/* <line
            x1="17%"
            y1="50%"
            x2="65%"
            y2="50%"
            style={{
              //   stroke: 'red',
              stroke: "url('#linear')",
              strokeWidth: 2,
            }}
          /> */}
          <rect x="17%" y="50%" width="48%" height="20" fill="url(#linear)" />
        </svg>
      </div>
    </section>
  );
};

export default HowItWorksSection;
