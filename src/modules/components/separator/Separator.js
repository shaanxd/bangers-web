import React from 'react';

import styles from './Separator.module.css';

const Separator = props => {
  return (
    <div className={styles.main__div}>
      <div className={styles.line} />
      <div className={styles.label}>OR</div>
      <div className={styles.line} />
    </div>
  );
};

export default Separator;
