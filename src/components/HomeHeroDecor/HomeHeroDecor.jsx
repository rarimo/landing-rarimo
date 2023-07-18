import './HomeHeroDecor.scss';

import cn from 'classnames';
import { memo } from 'react';

const HomeHeroDecor = ({ className }) => {
  const matrix = [
    [
      'transparent',
      'transparent',
      'latigo-bay',
      'transparent',
      'cantaloupe-slice',
    ],
    ['latigo-bay', 'sunstitch', 'cantaloupe-slice', 'le-max', 'sunstitch'],
    ['transparent', 'le-max', 'transparent', 'latigo-bay', 'latigo-bay'],
    ['transparent', 'latigo-bay', 'latigo-bay', 'le-max', 'latigo-bay'],
    [
      'transparent',
      'sagittarius-amber',
      'transparent',
      'latigo-bay',
      'transparent',
    ],
    ['transparent', 'le-max', 'transparent', 'transparent', 'transparent'],
  ];

  const getRandomNumber = () => {
    const max = 5;
    const min = 0;
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  return (
    <div className={cn(['home-hero-decor', className])} data-aos="fade-up">
      {matrix.map((row, index) => (
        <div className="home-hero-decor__row" key={index}>
          {row.map((cell, index) => (
            <span
              className={cn([
                'home-hero-decor__cell',
                `home-hero-decor__cell--${cell}`,
              ])}
              key={index}
              style={{ zIndex: getRandomNumber() }}

              //   data-aos-delay={getRandomNumber() * 150}
            ></span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(HomeHeroDecor);
