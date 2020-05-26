import React from 'react';
import ReactDatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import moment from 'moment';
import Select from 'react-select';

import { BOOKING_STATUS } from '../../constants/constants';
import {
  formatDateFromUtc,
  getDateFromUTC,
  getDateObjFromUTC,
  formatDateFromUtcWithoutTime,
} from '../../helper/vehicleHelper';
import { AppButton } from '..';

import './ExtendBooking.css';
import styles from './ExtendBooking.module.css';

const ExtendBooking = (props) => {
  const {
    booking: {
      id,
      startDate,
      returnDate,
      bookingStatus,
      vehicle: { name },
      equipment,
      totalPrice,
    },
    onSubmit,
    onAddEquipmentSubmit,
    loading,
    equipment: allEquipment,
    extensionError,
    addEquipmentError,
  } = props;

  const validateBeforeFour = (value) => {
    const returnMoment = moment(value);
    const momentAtFour = moment().year(returnMoment.year()).date(returnMoment.date()).hour(16).minute(0);
    return returnMoment.isBefore(momentAtFour);
  };

  const validateSameDate = (value) => {
    const returnMoment = moment(value);
    const actualReturnMoment = moment(returnDate);

    return returnMoment.isAfter(actualReturnMoment);
  };

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

  const getSelectEquipment = () => {
    const array = allEquipment.filter((x) => !equipment.filter((y) => y.id === x.id).length);

    return array.map(({ id, name }) => {
      return {
        value: id,
        label: name,
      };
    });
  };

  const renderBookingExtensionDiv = () => {
    return (
      <div className={styles.extension__main}>
        <Formik
          initialValues={{ returnDate: getDateObjFromUTC(returnDate), bookingId: id }}
          validationSchema={Yup.object().shape({
            returnDate: Yup.date()
              .typeError('Invalid type.')
              .test('Same test', 'Return date cannot be the or before the previous return date', validateSameDate)
              .test('Return test', 'You can only extend booking till 4:00 PM on same day', validateBeforeFour),
          })}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, setFieldTouched }) => {
            return (
              <Form className={styles.extension__div}>
                <span className={styles.status__message}>
                  {`Please note that this booking can only be extended till 4:00 PM on ${formatDateFromUtcWithoutTime(
                    returnDate
                  )}`}
                </span>
                <ReactDatePicker
                  selected={values.returnDate}
                  onChange={(value) => {
                    setFieldValue('returnDate', value);
                  }}
                  className={styles.date__picker}
                  minDate={new Date(getDateFromUTC(returnDate))}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  showTimeSelect
                  onBlur={() => {
                    setFieldTouched('returnDate');
                  }}
                  disabled={loading}
                />
                <ErrorMessage name="returnDate">
                  {(message) => <label className={styles.form__error}>{message}</label>}
                </ErrorMessage>
                <AppButton
                  text="Extend Booking"
                  type="submit"
                  containerStyle={{ marginTop: '10px', marginBottom: '10px' }}
                  loading={loading}
                />
                {extensionError && <label className={styles.form__error}>{extensionError}</label>}
              </Form>
            );
          }}
        </Formik>
        <Formik
          initialValues={{ equipment: [], bookingId: id }}
          validationSchema={Yup.object().shape({
            equipment: Yup.array()
              .nullable()
              .required('Please select at least one equipment.')
              .min(1, 'Please select at least one equipment.'),
          })}
          onSubmit={onAddEquipmentSubmit}
        >
          {({ values, setFieldValue, setFieldTouched }) => {
            return (
              <Form className={styles.extension__div}>
                <span className={styles.section__header}>ADDITIONAL EQUIPMENT</span>
                <Select
                  value={values.equipment}
                  onChange={(updated) => {
                    setFieldValue('equipment', updated);
                  }}
                  onBlur={() => {
                    setFieldTouched('equipment');
                  }}
                  options={getSelectEquipment()}
                  isMulti
                  isDisabled={loading}
                />
                <ErrorMessage name="equipment">
                  {(message) => <label className={styles.form__error}>{message}</label>}
                </ErrorMessage>
                <AppButton
                  text="Add Equipment"
                  type="submit"
                  containerStyle={{ marginTop: '10px', marginBottom: '10px' }}
                  loading={loading}
                />
                {addEquipmentError && <label className={styles.form__error}>{addEquipmentError}</label>}
              </Form>
            );
          }}
        </Formik>
      </div>
    );
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
        <div className={styles.header__light}>TOTAL PRICE</div>
        <span className={styles.header__title}>{`$ ${totalPrice}`}</span>
      </div>
      <div className={styles.header__div}>
        <div className={styles.header__light}>EQUIPMENT</div>
        <span className={styles.header__title}>{renderEquipmentList()}</span>
      </div>
      <span className={styles.section__header}>EXTEND BOOKING</span>
      {bookingStatus === BOOKING_STATUS.COLLECTED || bookingStatus === BOOKING_STATUS.BOOKED ? (
        renderBookingExtensionDiv()
      ) : (
        <span className={styles.status__message}>Sorry, this booking cannot be updated</span>
      )}
    </div>
  );
};

export default ExtendBooking;
