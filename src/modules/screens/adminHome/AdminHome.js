import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosClose } from 'react-icons/io';
import { AiOutlineBook } from 'react-icons/ai';

import { Loading, StatusSelect, PageHeader, BookingItem, Glitch } from '../../components';
import { useMergedState } from '../../helper/useMergedState';
import { getBookings, updateBooking } from '../../api/admin';

import styles from './AdminHome.module.css';

const AdminHome = (props) => {
  const [state, setState] = useMergedState({
    bookingsLoading: true,
    bookings: [],
    bookingsError: null,
    selectedBooking: null,
  });

  const { token } = props;
  const { bookingsLoading, bookings, bookingsError, selectedBooking } = state;

  useEffect(() => {
    loadBookingsFromApi();
    //eslint-disable-next-line
  }, []);

  const loadBookingsFromApi = async () => {
    try {
      if (!bookingsLoading) {
        setState({ bookingsLoading: true, bookingsError: null, selectedBooking: null });
      }
      const result = await getBookings(token);
      setState({ bookingsLoading: false, bookings: [...result.bookings] });
    } catch (err) {
      setState({ bookingsLoading: false, bookingsError: err.message });
    }
  };

  const onStatusChangeSubmit = async (bookingData) => {
    try {
      setState({ bookingsLoading: true });
      await updateBooking(bookingData, token);
      loadBookingsFromApi();
    } catch (err) {
      setState({ bookingsLoading: false, bookingsError: err.message });
    }
  };

  const renderLoading = () => {
    return <Loading text="Loading" />;
  };

  const renderEmpty = () => {
    return (
      <div className={styles.empty__div}>
        <AiOutlineBook size={30} />
        <span> No bookings found.</span>
      </div>
    );
  };

  const renderError = () => {
    return <Glitch text={bookingsError} onRetry={loadBookingsFromApi} />;
  };

  const onBookingSelect = (booking) => {
    setState({ selectedBooking: { ...booking } });
  };

  const onBookingDeSelect = () => {
    if (!bookingsLoading) {
      setState({ selectedBooking: null });
    }
  };

  const renderBookingList = () => {
    const components = bookings.map((booking) => {
      return <BookingItem item={booking} key={booking.id} onSelect={onBookingSelect} />;
    });

    return components;
  };

  return bookingsLoading ? (
    renderLoading()
  ) : bookingsError ? (
    renderError()
  ) : bookings.length === 0 ? (
    renderEmpty()
  ) : (
    <div className={styles.main__div}>
      <div className={styles.booking__list}>
        <PageHeader text="All Bookings" />
        {renderBookingList()}
      </div>
      {selectedBooking && (
        <div className={styles.modal__div}>
          <div className={styles.backdrop__div} onClick={onBookingDeSelect}></div>
          <div className={styles.side__drawer}>
            <div className={styles.close__div}>
              <button type="button" className={styles.close__button} onClick={onBookingDeSelect}>
                <IoIosClose size={20} />
                <span>CLOSE</span>
              </button>
            </div>
            <div className={styles.flex__div} />
            <StatusSelect
              value={selectedBooking.bookingStatus}
              onClick={(value) => {
                onStatusChangeSubmit({ status: value, id: selectedBooking.id });
              }}
              booking={selectedBooking}
            />
            <div className={styles.flex__div} />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({
  auth: {
    auth: { authToken: token },
  },
}) => {
  return {
    token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminHome));
