import React from 'react';
import Moment from 'moment';

import styles from './BookingItem.module.css';
import { AppButton } from '..';

const BookingItem = props => {
  const {
    item: {
      startDate,
      returnDate,
      bookingStatus,
      vehicle: { name }
    },
    onSelect,
    item
  } = props;

  const handleOnClick = () => {
    onSelect(item);
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.content__div}>
        <div className={styles.text__group}>
          <span className={styles.text__header}>VEHICLE :</span>
          <span className={styles.text__value}>{name}</span>
        </div>
        <div className={styles.separator} />
        <div className={styles.text__group}>
          <span className={styles.text__header}>FROM :</span>
          <span className={styles.text__value}>{Moment(startDate).format('dddd, MMMM Do YYYY')}</span>
        </div>
        <div className={styles.separator} />
        <div className={styles.text__group}>
          <span className={styles.text__header}>TO :</span>
          <span className={styles.text__value}>{Moment(returnDate).format('dddd, MMMM Do YYYY')}</span>
        </div>
        <div className={styles.separator} />
        <div className={styles.text__group}>
          <span className={styles.text__header}>STATUS :</span>
          <span className={styles.text__value}>{bookingStatus}</span>
        </div>
        <div className={styles.button__container}>
          <AppButton onClick={handleOnClick} text="View" />
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
