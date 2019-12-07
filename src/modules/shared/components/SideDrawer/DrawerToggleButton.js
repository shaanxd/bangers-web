import React from 'react';

import './DrawerToggleButton.css';

const DrawerToggleButton = props => {
  return (
    <button onClick={props.onClick} className="toggle-button">
      <div className="toggle-button__line" />
      <div className="toggle-button__line" />
      <div className="toggle-button__line" />
    </button>
  );
};

export default DrawerToggleButton;
