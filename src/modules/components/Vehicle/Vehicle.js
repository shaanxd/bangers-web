import React from 'react';

import { getImageUrl } from '../../helper/vehicleHelper';

import styles from './Vehicle.module.css';

const Vehicle = props => {
  const {
    vehicle: {
      id,
      defaultImage,
      name,
      vehicleType: { type, numberOfSeats, pricePerDay }
    },
    onBookClick
  } = props;

  const handleOnClick = () => {
    onBookClick(id);
  };

  return (
    <div key={id} className={styles.main__div}>
      <div className={styles.child__div}>
        <img alt="haha" className={styles.image} src={getImageUrl(defaultImage)} />
        <div className={styles.hover__div} onClick={handleOnClick}>
          <label className={styles.header__label}>{name}</label>
          <span className={styles.detail__label}>{type}</span>
          <span className={styles.detail__label}>{`${numberOfSeats} seats`}</span>
          <div className={styles.price__div}>
            <span className={styles.price__label}>{`$${pricePerDay.toFixed(2)}`}</span>
            <span className={styles.detail__label}>/ day</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vehicle;
