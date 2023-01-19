import './HowItWorksChart.scss';

import { useEffect, useState, useRef } from 'react';
import cn from 'classnames';

const HowItWorksChart = ({ isAnimationStarted, firstBlockRef }) => {
  const [step, setStep] = useState(0);

  const path1FrontRef = useRef(null);
  const path1BackRef = useRef(null);
  const path2FrontRef = useRef(null);
  const path2BackRef = useRef(null);
  const path3FrontRef = useRef(null);
  const path3BackRef = useRef(null);
  const path4FrontRef = useRef(null);
  const path4BackRef = useRef(null);

  useEffect(() => {
    if (isAnimationStarted) {
      setStep(1);
    }
  }, [isAnimationStarted]);

  useEffect(() => {
    if (!firstBlockRef) return;

    setTimeout(() => {
      let currentX = 0;
      let currentY = 0;
      const firstBlockRect = firstBlockRef.getBoundingClientRect();
      const path1Rect = path1FrontRef.current.getBoundingClientRect();
      const path2Rect = path2FrontRef.current.getBoundingClientRect();
      const path3Rect = path3FrontRef.current.getBoundingClientRect();

      currentY = firstBlockRect.height / 2;
      currentX = 166;
      path1FrontRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      path1BackRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;

      currentY += path1Rect.height;
      currentX += 14;
      path2FrontRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      path2BackRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;

      currentX += path2Rect.width;
      path3FrontRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      path3BackRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;

      currentX += path3Rect.width - 662;
      currentY += path3Rect.height;
      path4FrontRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
      path4BackRef.current.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }, 200);
  }, [firstBlockRef]);

  return (
    <svg
      className="how-it-works-chart"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        ref={path2BackRef}
        className="how-it-works-chart__line-path how-it-works-chart__back-line"
        d="M0 1H803"
      />
      <path
        ref={path2FrontRef}
        className={cn([
          'how-it-works-chart__path-2 how-it-works-chart__line-path how-it-works-chart__front-line',
          {
            'how-it-works-chart__path-2--animation': step >= 2,
          },
        ])}
        d="M0 1H803"
        onAnimationEnd={() => setStep(3)}
      />

      <path
        ref={path1BackRef}
        className="how-it-works-chart__line-path how-it-works-chart__front-line"
        d="M0 258H216.652C228.373 258 237.874 249.046 237.874 238V142C237.874 130.954 247.375 122 259.096 122H499.778C511.499 122 521 113.046 521 102V20.9995C521 9.95382 511.499 0.999512 499.778 0.999512H269.519"
      />
      <path
        ref={path1FrontRef}
        className={cn([
          'how-it-works-chart__path-1 how-it-works-chart__line-path how-it-works-chart__back-line',
          {
            'how-it-works-chart__path-1--animation': step >= 1,
          },
        ])}
        d="M0 258H216.652C228.373 258 237.874 249.046 237.874 238V142C237.874 130.954 247.375 122 259.096 122H499.778C511.499 122 521 113.046 521 102V20.9995C521 9.95382 511.499 0.999512 499.778 0.999512H269.519"
        onAnimationEnd={() => setStep(2)}
      />

      <path
        ref={path3BackRef}
        className="how-it-works-chart__line-path how-it-works-chart__back-line"
        d="M0.160156 1H32.4862C43.5319 1 52.4862 9.95431 52.4862 21V117C52.4862 128.046 61.4405 137 72.4862 137H104.812"
      />
      <path
        ref={path3FrontRef}
        className={cn([
          'how-it-works-chart__path-3 how-it-works-chart__line-path how-it-works-chart__front-line',
          {
            'how-it-works-chart__path-3--animation': step >= 3,
          },
        ])}
        d="M0.160156 1H32.4862C43.5319 1 52.4862 9.95431 52.4862 21V117C52.4862 128.046 61.4405 137 72.4862 137H104.812"
        onAnimationEnd={() => setStep(4)}
      />

      <path
        ref={path4BackRef}
        className="how-it-works-chart__line-path how-it-works-chart__front-line"
        d="M0 137H720C731.046 137 740 128.046 740 117V21C740 9.95431 731.046 1 720 1H661"
      />
      <path
        ref={path4FrontRef}
        className={cn([
          'how-it-works-chart__path-4 how-it-works-chart__line-path how-it-works-chart__back-line',
          {
            'how-it-works-chart__path-4--animation': step >= 4,
          },
        ])}
        d="M0 137H720C731.046 137 740 128.046 740 117V21C740 9.95431 731.046 1 720 1H661"
      />
    </svg>
  );
};

export default HowItWorksChart;
