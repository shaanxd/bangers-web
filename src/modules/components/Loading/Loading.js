import React from 'react';
import { ClipLoader } from 'react-spinners';

import styles from './Loading.module.css';

const Loading = props => {
  const { text } = props;

  return (
    <div className={styles.main__div}>
      <ClipLoader size={30} />
      <span>{text}</span>
    </div>
  );
};

export default Loading;
