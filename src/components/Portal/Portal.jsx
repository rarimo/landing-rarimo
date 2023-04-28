import { memo } from 'react';
import { createPortal } from 'react-dom';

import { COMPONENT_NODE_IDS } from '@/const';

const Portal = ({ children, domNodeId = COMPONENT_NODE_IDS.application }) => {
  const targetNode = document.getElementById(domNodeId);

  return <>{targetNode && createPortal(children, targetNode)}</>;
};

export default memo(Portal);
