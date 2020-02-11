import React from 'react';

import styles from './StatusSelect.module.css';
import { BOOKING_STATUS } from '../../constants/constants';

const StatusSelect = props => {
  const { onClick, value } = props;

  const renderOptions = () => {
    const components = Object.keys(BOOKING_STATUS).map(option => {
      const style = value === option ? [styles.radio, styles.selected].join(' ') : styles.radio;
      return (
        <button
          key={option}
          type="button"
          onClick={() => {
            onClick(option);
          }}
          className={style}
        >
          {option}
        </button>
      );
    });
    return components;
  };
  return <div className={styles.main__div}>{renderOptions()}</div>;
};

export default StatusSelect;
