import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'moment';

import { Loading, StatusSelect } from '../../components';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { Collapse } from 'react-collapse';
import { useMergedState } from '../../helper/useMergedState';
import { getBookings, updateBooking } from '../../api/admin';

import styles from './AdminHome.module.css';
import './AdminHome.css';

const AdminHome = props => {
  const [state, setState] = useMergedState({
    bookingsLoading: true,
    bookings: [],
    bookingsError: null,
    selectedId: null
  });

  const { token } = props;
  const { bookingsLoading, bookings, bookingsError, selectedId } = state;

  useEffect(() => {
    loadBookingsFromApi();
    //eslint-disable-next-line
  }, []);

  const loadBookingsFromApi = async () => {
    try {
      if (!bookingsLoading) {
        setState({ bookingsLoading: true, bookingsError: null });
      }
      const result = await getBookings(token);
      setState({ bookingsLoading: false, bookings: [...result.bookings] });
    } catch (err) {
      setState({ bookingsLoading: false, bookingsError: err });
    }
  };

  const onStatusChangeSubmit = async bookingData => {
    try {
      setState({ bookingsLoading: true });
      await updateBooking(bookingData, token);
      loadBookingsFromApi();
    } catch (err) {
      console.log(err.message);
      setState({ bookingsLoading: false });
    }
  };

  const renderLoading = () => {
    return <Loading text="Loading" />;
  };

  const renderEmpty = () => {
    return <div>Empty</div>;
  };

  const renderError = () => {
    return <div>{bookingsError}</div>;
  };

  const onBookingSelect = id => {
    setState({ selectedId: selectedId === id ? null : id });
  };

  const renderBookingItems = () => {
    const items = bookings.map(booking => {
      const { vehicle, id, user, startDate, returnDate, bookingStatus } = booking;
      return (
        <div className={styles.booking__root} key={id}>
          <div
            className={styles.booking__item}
            onClick={() => {
              onBookingSelect(id);
            }}
          >
            <div className={styles.booking__content}>
              <span className={styles.header__title}>BOOKED BY:</span>
              <span className={styles.booking__id}>{`${user.firstname} ${user.lastname}`}</span>
            </div>
            <div className={styles.separator} />
            <div className={styles.booking__content}>
              <span className={styles.header__title}>VEHICLE</span>
              <span className={styles.booking__id}>{vehicle.name}</span>
            </div>
            <div className={styles.separator} />
            <div className={styles.booking__content}>
              <span className={styles.header__title}>PICKED UP ON:</span>
              <span className={styles.booking__id}>{Moment(startDate).format('dddd, MMMM Do YYYY')}</span>
            </div>
            <div className={styles.separator} />
            <div className={styles.booking__content}>
              <span className={styles.header__title}>RETURNED ON:</span>
              <span className={styles.booking__id}>{Moment(returnDate).format('dddd, MMMM Do YYYY')}</span>
            </div>
            <button className={styles.button__container}>
              {selectedId === id ? <IoIosArrowUp size={20} /> : <IoIosArrowDown size={20} />}
            </button>
          </div>
          <Collapse isOpened={selectedId === id}>
            <div className={styles.collapse__div}>
              <span className={styles.header__title}>BOOKING STATUS:</span>
              <StatusSelect
                value={bookingStatus}
                onClick={value => {
                  onStatusChangeSubmit({ status: value, id });
                }}
              />
            </div>
          </Collapse>
        </div>
      );
    });

    return items;
  };

  return bookingsLoading ? (
    renderLoading()
  ) : bookingsError ? (
    renderError()
  ) : bookings.length === 0 ? (
    renderEmpty()
  ) : (
    <div className={styles.main__div}>
      <div className={styles.bookings__div}>{renderBookingItems()}</div>
    </div>
  );
};

const mapStateToProps = ({
  auth: {
    auth: { authToken: token }
  }
}) => {
  return {
    token
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminHome));
