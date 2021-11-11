import React from 'react';
import { Config } from '../../config.js';

import Menu from './Menu';

const PageWrapper = ({ headerMenu, children } ) => {
  return (
    <>
      <Menu menu={headerMenu} />
      { children }
    </>
  );
};

export default PageWrapper;
