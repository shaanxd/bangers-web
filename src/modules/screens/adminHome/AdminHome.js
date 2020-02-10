import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'moment';

import { useMergedState } from '../../helper/useMergedState';
import { getBookings } from '../../api/admin';
import { getImageUrl } from '../../helper/vehicleHelper';

import styles from './AdminHome.module.css';
import { Loading } from '../../components';

const AdminHome = props => {
  const [state, setState] = useMergedState({
    bookingsLoading: true,
    bookings: [],
    bookingsError: null
  });

  const { token } = props;
  const { bookingsLoading, bookings, bookingsError } = state;

  useEffect(() => {
    loadBookingsFromApi();
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

  const renderLoading = () => {
    return <Loading text="Loading" />;
  };

  const renderEmpty = () => {
    return <div>Empty</div>;
  };

  const renderError = () => {
    return <div>{bookingsError}</div>;
  };

  const renderEquipment = equipment => {
    const items = equipment.map(equipment => {
      return <div className={styles.equipment__name}>{equipment.name}</div>;
    });
    return items;
  };

  const renderBookingItems = () => {
    const items = bookings.map(booking => {
      const { vehicle, id, user, startDate, returnDate, equipment } = booking;

      return (
        <div className={styles.booking__item} key={id}>
          <img src={getImageUrl(vehicle.defaultImage)} className={styles.thumbnail} alt="Vehicle" />
          <div className={styles.booking__details}>
            <div className={styles.booking__header}>
              <span className={styles.header__title}>Booking ID : </span>
              <span className={styles.booking__id}>{id.toUpperCase()}</span>
            </div>
            <div className={styles.booking__content}>
              <span className={styles.header__title}>Booked by : </span>
              <span className={styles.booking__id}>{`${user.firstname} ${user.lastname}`}</span>
            </div>
            <div className={styles.booking__content}>
              <span className={styles.header__title}>Vehicle : </span>
              <span className={styles.booking__id}>{vehicle.name}</span>
            </div>
            <div className={styles.booking__content}>
              <span className={styles.header__title}>From : </span>
              <span className={styles.booking__id}>{Moment(startDate).format('dddd, MMMM Do YYYY')}</span>
            </div>
            <div className={styles.booking__content}>
              <span className={styles.header__title}>To : </span>
              <span className={styles.booking__id}>{Moment(returnDate).format('dddd, MMMM Do YYYY')}</span>
            </div>
            <div className={styles.equipment__content}>
              <span className={styles.header__title}>Equipment : </span>
              {renderEquipment(equipment)}
            </div>
          </div>
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
