import React from 'react';

import styles from './PageHeader.module.css';

const PageHeader = props => {
  const { text } = props;
  return (
    <div className={styles.main__div}>
      <div className={styles.line__div} />
      <span>{text}</span>
      <div className={styles.line__div} />
    </div>
  );
};

export default PageHeader;
