import React from 'react';
import ReactDatePicker from 'react-datepicker';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage } from 'formik';
import moment from 'moment';

import { BOOKING_STATUS } from '../../constants/constants';
import { formatDateFromUtc, getDateFromUTC, getDateObjFromUTC } from '../../helper/vehicleHelper';

import './ExtendBooking.css';
import styles from './ExtendBooking.module.css';
import { AppButton } from '..';

const ExtendBooking = props => {
  const {
    booking: {
      id,
      startDate,
      returnDate,
      bookingStatus,
      vehicle: { name }
    },
    onSubmit,
    loading
  } = props;

  const validateBeforeFour = value => {
    const returnMoment = moment(value);
    const momentAtFour = moment()
      .year(returnMoment.year())
      .date(returnMoment.date())
      .hour(16)
      .minute(0);
    return returnMoment.isBefore(momentAtFour);
  };

  const validateSameDate = value => {
    const returnMoment = moment(value);
    const actualReturnMoment = moment(returnDate);

    return returnMoment.isAfter(actualReturnMoment);
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
              .test('Return test', 'You can only extend booking till 4:00 PM on same day', validateBeforeFour)
          })}
          onSubmit={onSubmit}
        >
          {({ values, setFieldValue, setFieldTouched }) => {
            return (
              <Form className={styles.extension__div}>
                <ReactDatePicker
                  selected={values.returnDate}
                  onChange={value => {
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
                  {message => <label className={styles.form__error}>{message}</label>}
                </ErrorMessage>
                <AppButton
                  text="Extend Booking"
                  type="submit"
                  containerStyle={{ marginTop: '10px' }}
                  loading={loading}
                />
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
      <span className={styles.section__header}>EXTEND BOOKING</span>
      {bookingStatus === BOOKING_STATUS.COLLECTED || bookingStatus === BOOKING_STATUS.BOOKED ? (
        renderBookingExtensionDiv()
      ) : (
        <span className={styles.status__message}>THIS BOOKING CANNOT BE EXTENDED</span>
      )}
    </div>
  );
};

export default ExtendBooking;
