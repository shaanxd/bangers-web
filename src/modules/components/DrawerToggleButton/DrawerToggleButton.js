import React from 'react';

import { Icomoon } from '../';

import './DrawerToggleButton.css';

const DrawerToggleButton = props => {
  return (
    <button onClick={props.onClick} className="toggle-button">
      <Icomoon icon="menu" color="white" size={30} />
    </button>
  );
};

export default DrawerToggleButton;
