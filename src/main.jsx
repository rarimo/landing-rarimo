// import '@/styles/index.scss';

// import { initLocalization } from '@/localization';
// import {
//   defineDesktopFontSizes,
//   hideLoader,
//   initAOS,
//   initParallax,
//   initSwiper,
// } from '@/js';

// const setup = () => {
//   initLocalization();

//   setTimeout(() => {
//     hideLoader();
//     defineDesktopFontSizes();
//     initAOS();
//     initParallax();
//     initSwiper();
//   }, 500);
// };

// setup();

import '@/styles/index.scss';
import '@/localization';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
