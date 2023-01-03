import './HowItWorksSection.scss';

import { useTranslation } from 'react-i18next';

const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <section className="how-it-works-section container">
      <div className="how-it-works-section__chart-wrapper">
        <ul className="how-it-works-section__chart">
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.first')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.second')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.third')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.fourth')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.fifth')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.sixth')}
          </li>
          <li className="how-it-works-section__chart-item">
            {t('how-it-works-section.chart-steps.seventh')}
          </li>
        </ul>
        <svg
          className="how-it-works-section__chart-lines"
          height="100%"
          width="100%"
        >
          {/* <defs>
             <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%"> 
            <linearGradient id="linear" x1="0">
              {/* <stop offset="0%" stop-color="#05a" />
              <stop offset="100%" stop-color="#0a5" /> 
              <stop offset="50%" stop-color="#181B1C">
<animate
                  attributeName="stop-color"
                  values="#181B1C; #181B1C; #82CFE2"
                  dur="10s"
                  repeatCount="indefinite"
                ></animate>
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
                 <animate
                  attributeName="stop-color"
                  values="#181B1C; #82CFE2; #82CFE2"
                  dur="4s"
                  repeatCount="indefinite"
                ></animate> 
              </stop>
            </linearGradient>
          </defs> */}
          <line
            className="how-it-works-section__chart-line"
            x1="17%"
            y1="50%"
            x2="65%"
            y2="50%"
            // style={{
            //   //   stroke: 'red',
            //   stroke: "url('#linear')",
            //   strokeWidth: 2,
            // }}
          />
          <circle
            cx="30"
            cy="40"
            r="20"
            // stroke="var(--col-silverpine-cyan)"
            stroke="red"
            stroke-width="2"
            // stroke-dasharray="314"
            // stroke-dashoffset="314"
          />
          <line
            className="how-it-works-section__chart-line"
            x1="38%"
            y1="93%"
            x2="83%"
            y2="93%"
          />
          <line
            className="how-it-works-section__chart-line"
            x1="38%"
            y1="93%"
            x2="83%"
            y2="93%"
          />
          {/* <rect x="17%" y="50%" width="48%" height="20" fill="url(#linear)" /> */}
        </svg>
      </div>
    </section>
  );
};

export default HowItWorksSection;
