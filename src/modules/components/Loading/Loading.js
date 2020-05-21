import React from 'react';
import { MoonLoader } from 'react-spinners';

import styles from './Loading.module.css';

const Loading = (props) => {
  const { text } = props;

  return (
    <div className={styles.main__div}>
      <MoonLoader size={50} />
      <span>{text}</span>
    </div>
  );
};

export default Loading;
