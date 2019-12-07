import React from 'react';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

import './Toolbar.css';

const Toolbar = props => {
  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton onClick={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          <a href="/">Bangers</a>
        </div>
        <div className="spacer" />
        <div className="toolbar__navigation-items">
          <ul>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/signup">Signup</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
