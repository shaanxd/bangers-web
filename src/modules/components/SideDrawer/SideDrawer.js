import React from 'react';

import './SideDrawer.css';

const SideDrawer = props => {
  let drawerStyles = props.isOpen ? 'side-drawer open' : 'side-drawer';

  return (
    <nav className={drawerStyles}>
      <ul>
        <li>
          <a href="/">Login</a>
        </li>
        <li>
          <a href="/">Signup</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;
