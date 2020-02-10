import React from 'react';
import { IoIosMenu } from 'react-icons/io';

import styles from './DrawerToggleButton.module.css';

const DrawerToggleButton = props => {
  return (
    <button onClick={props.onClick} className={styles.toggle__button}>
      <IoIosMenu size={30} />
    </button>
  );
};

export default DrawerToggleButton;
