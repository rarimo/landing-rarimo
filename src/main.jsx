import '@/styles/index.scss';
import '@/localization';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import TagManager from 'react-gtm-module';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import { CONFIG } from '@/config';

if (import.meta.env.MODE === 'production') {
  const tagManagerArgs = {
    gtmId: CONFIG.googleTagManagerId,
    dataLayer: window.dataLayer || [],
  };

  TagManager.initialize(tagManagerArgs);
}

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
