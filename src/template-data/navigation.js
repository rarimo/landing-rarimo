import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS, ROUTES_PATHS } from '@/const';

export const navigation = [
  {
    textKey: 'navigation.home',
    path: COMPONENT_NODE_IDS.heroSection,
    hash: true,
    routeLink: ROUTES_PATHS.home,
  },
  {
    textKey: 'navigation.use-cases',
    path: COMPONENT_NODE_IDS.useCasesSection,
    hash: true,
    includeRoutes: [ROUTES_PATHS.home],
  },
  {
    textKey: 'navigation.community',
    path: COMPONENT_NODE_IDS.communitySection,
    hash: true,
  },
  {
    textKey: 'navigation.support',
    path: CONFIG.supportMailLink,
    external: true,
  },
];
