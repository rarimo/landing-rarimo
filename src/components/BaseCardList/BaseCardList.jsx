import './BaseCardList.scss';

import { Children, cloneElement } from 'react';

const BaseCardList = ({ children }) => (
  <ul className="base-card-list">
    {Children.map(children, child =>
      cloneElement(child, {
        className: `${child.props.className} base-card-list__card`,
      }),
    )}
  </ul>
);

export default BaseCardList;
