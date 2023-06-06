import { CONFIG } from '@/config';
import { COMPONENT_NODE_IDS } from '@/const';

export const navigation = [
  {
    textKey: 'navigation.home',
    path: COMPONENT_NODE_IDS.heroSection,
    hash: true,
  },
  {
    textKey: 'navigation.use-cases',
    path: COMPONENT_NODE_IDS.useCasesSection,
    hash: true,
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
