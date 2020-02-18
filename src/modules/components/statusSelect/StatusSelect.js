import React from 'react';

import { BOOKING_STATUS } from '../../constants/constants';
import { formatDateFromUtc } from '../../helper/vehicleHelper';

import styles from './StatusSelect.module.css';

const StatusSelect = props => {
  const {
    onClick,
    value,
    booking: {
      id,
      vehicle: { name },
      startDate,
      returnDate,
      bookingStatus,
      equipment
    }
  } = props;

  const renderEquipmentList = () => {
    if (equipment.length === 0) {
      return 'None';
    }
    let val = '';
    for (let i = 0; i < equipment.length; i++) {
      if (i === equipment.length - 1) {
        val += `${equipment[i].name}`;
      } else {
        val += `${equipment[i].name}, `;
      }
    }
    return val;
  };

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
  return (
    <div className={styles.main__div}>
      <span className={styles.section__header}>BOOKING DETAILS</span>
      <div className={styles.header__div}>
        <div className={styles.header__light}>BOOKING</div>
        <span className={styles.header__title}>{id.replace(/-/g, '').toUpperCase()}</span>
      </div>
      <div className={styles.header__div}>
        <div className={styles.header__light}>VEHICLE</div>
        <span className={styles.header__title}>{name}</span>
      </div>
      <div className={styles.header__div}>
        <div className={styles.header__light}>START DATE</div>
        <span className={styles.header__title}>{formatDateFromUtc(startDate)}</span>
      </div>
      <div className={styles.header__div}>
        <div className={styles.header__light}>RETURN DATE</div>
        <span className={styles.header__title}>{formatDateFromUtc(returnDate)}</span>
      </div>
      <div className={styles.header__div}>
        <div className={styles.header__light}>STATUS</div>
        <span className={styles.header__title}>{bookingStatus}</span>
      </div>
      <div className={styles.header__div}>
        <div className={styles.header__light}>EQUIPMENT</div>
        <span className={styles.header__title}>{renderEquipmentList()}</span>
      </div>
      <span className={styles.section__header}>UPDATE STATUS</span>
      <div className={styles.list__div}>{renderOptions()}</div>
    </div>
  );
};

export default StatusSelect;
