import React from 'react';

import { getImageUrl } from '../../helper/vehicleHelper';

import styles from './Vehicle.module.css';

const Vehicle = props => {
  const {
    vehicle: { id, defaultImage, name },
    onBookClick
  } = props;

  const handleOnClick = () => {
    onBookClick(id);
  };

  return (
    <div key={id} className={styles.parentDiv}>
      <div className={styles.childDiv}>
        <img
          alt="haha"
          className={styles.image}
          src={getImageUrl(defaultImage)}
        />
        <label className={styles.headerLabel}>{name}</label>
        <button
          className={styles.bookBtn}
          type="button"
          onClick={handleOnClick}
        >
          Rent
        </button>
      </div>
    </div>
  );
};

export default Vehicle;
