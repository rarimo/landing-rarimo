import { CONFIG } from '@/config';
import { ROUTES_PATHS } from '@/const';

export const useCasesList = [
  {
    img: '/img/use-cases-section/mints.webp',
    modifier: 'mints',
    titleKey: 'use-cases-section.mints-title',
    textKey: 'use-cases-section.mints-text',
    path: CONFIG.docsLink,
    isBig: true,
    external: true,
  },
  {
    img: '/img/use-cases-section/gaming-profiles.webp',
    modifier: 'gaming-profiles',
    titleKey: 'use-cases-section.gaming-profiles-title',
    textKey: 'use-cases-section.gaming-profiles-text',
    path: CONFIG.docsLink,
    external: true,
  },
  {
    img: '/img/use-cases-section/ssi.webp',
    modifier: 'ssi',
    titleKey: 'use-cases-section.ssi-title',
    textKey: 'use-cases-section.ssi-text',
    path: CONFIG.docsLink,
    external: true,
  },
  {
    img: '/img/use-cases-section/nft-checkout.webp',
    modifier: 'nft-checkout',
    titleKey: 'use-cases-section.nft-checkout-title',
    textKey: 'use-cases-section.nft-checkout-text',
    routeLink: ROUTES_PATHS.nftCheckout,
  },
  {
    img: '/img/use-cases-section/token-agnostic.webp',
    modifier: 'token-agnostic',
    titleKey: 'use-cases-section.token-agnostic-title',
    textKey: 'use-cases-section.token-agnostic-text',
    path: CONFIG.docsLink,
    external: true,
  },
  {
    img: '/img/use-cases-section/social-graphs.webp',
    modifier: 'social-graphs',
    titleKey: 'use-cases-section.social-graphs-title',
    textKey: 'use-cases-section.social-graphs-text',
    path: CONFIG.docsLink,
    external: true,
  },
  {
    img: '/img/use-cases-section/name-servers.webp',
    modifier: 'name-servers',
    titleKey: 'use-cases-section.name-servers-title',
    textKey: 'use-cases-section.name-servers-text',
    path: CONFIG.docsLink,
    external: true,
  },
];
