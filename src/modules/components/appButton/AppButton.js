import React, { useState } from 'react';
import { PulseLoader } from 'react-spinners';

import styles from './AppButton.module.css';

const AppButton = props => {
  const { containerStyle, loading, onClick, type, text, icon: Icon, size = 30 } = props;

  const [hover, setHover] = useState(false);

  const onMouseLeave = () => {
    setHover(false);
  };

  const onMouseEnter = () => {
    setHover(true);
  };

  return (
    <div className={styles.button__container} style={containerStyle}>
      {Icon && (
        <div className={styles.icon__container}>
          <Icon size={size} />
        </div>
      )}
      <button
        className={styles.button}
        disabled={loading}
        onClick={onClick ? onClick : null}
        type={type}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {loading ? <PulseLoader size={5} color={hover ? '#000000' : '#FFFFFF'} loading /> : text.toUpperCase()}
      </button>
    </div>
  );
};

export default AppButton;
