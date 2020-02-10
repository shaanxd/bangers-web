import React from 'react';

import styles from './Glitch.module.css';
import { AppButton } from '..';

const Glitch = props => {
  return (
    <div className={styles.main__div}>
      {props.icon && <props.icon color="gray" size={35} />}
      <span className={styles.error__text}>{props.text}</span>
      {props.onRetry && (
        <div className={styles.button__container}>
          <AppButton text="Retry" onClick={props.onRetry} type="button" />
        </div>
      )}
    </div>
  );
};

export default Glitch;
