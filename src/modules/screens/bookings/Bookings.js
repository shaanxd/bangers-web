import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { BookingItem, ExtendBooking } from '../../components';
import { getBookings } from '../../api/user';
import { useMergedState } from '../../helper/useMergedState';

import styles from './Bookings.module.css';
import { extendBooking } from '../../api/vehicles';
import { getDateStringInUTC } from '../../helper/vehicleHelper';

const Bookings = props => {
  const [state, setState] = useMergedState({
    loading: true,
    error: null,
    bookings: [],
    selectedBooking: null,
    extensionLoading: false
  });

  const { loading, bookings, selectedBooking, extensionLoading } = state;

  useEffect(
    () => {
      loadBookingsFromApi();
    },
    //eslint-disable-next-line
    []
  );

  const { token } = props;

  const loadBookingsFromApi = async () => {
    try {
      if (!loading) {
        setState({ loading: true, error: null });
      }
      const result = await getBookings(token);
      setState({ loading: false, bookings: [...result] });
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  const onExtensionSubmit = async ({ bookingId, returnDate }) => {
    try {
      setState({ extensionLoading: true });
      const body = {
        bookingId,
        returnDate: getDateStringInUTC(returnDate)
      };
      await extendBooking(body, token);
      setState({ selectedBooking: null, extensionLoading: false });
      loadBookingsFromApi();
    } catch (err) {
      setState({ extensionLoading: false });
    }
  };

  const renderBookingList = () => {
    const components = bookings.map(booking => {
      return <BookingItem item={booking} key={booking.id} onSelect={onBookingSelect} />;
    });

    return components;
  };

  const onBookingSelect = booking => {
    setState({ selectedBooking: { ...booking } });
  };

  const onBookingDeSelect = () => {
    if (!extensionLoading) {
      setState({ selectedBooking: null });
    }
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.booking__list}>{renderBookingList()}</div>
      {selectedBooking && (
        <div className={styles.modal__div}>
          <div className={styles.backdrop__div} onClick={onBookingDeSelect}></div>
          <div className={styles.side__drawer}>
            <div className={styles.flex__div} />
            <ExtendBooking booking={selectedBooking} onSubmit={onExtensionSubmit} loading={extensionLoading} />
            <div className={styles.flex__div} />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({
  auth: {
    auth: { authToken: token }
  }
}) => {
  return { token };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
