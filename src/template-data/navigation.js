import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS, ROUTES_PATHS } from '@/const';

export const navigation = [
  {
    textKey: 'navigation.use-cases',
    path: COMPONENT_NODE_IDS.useCasesSection,
    hash: true,
    includeRoutes: [ROUTES_PATHS.home],
  },
  {
    textKey: 'navigation.documentation',
    path: CONFIG.docsLink,
    external: true,
  },
  {
    textKey: 'navigation.support',
    path: COMPONENT_NODE_IDS.communitySection,
    hash: true,
  },
];
