import { COMPONENT_NODE_IDS } from '@/const';

export const checkAnchors = hash => {
  switch (hash) {
    case '#' + COMPONENT_NODE_IDS.application:
      return COMPONENT_NODE_IDS.application;
    case '#' + COMPONENT_NODE_IDS.communitySection:
      return COMPONENT_NODE_IDS.communitySection;
    case '#' + COMPONENT_NODE_IDS.protocolSection:
      return COMPONENT_NODE_IDS.protocolSection;
    case '#' + COMPONENT_NODE_IDS.heroSection:
      return COMPONENT_NODE_IDS.heroSection;
    default:
      return;
  }
};
