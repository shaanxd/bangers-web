import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { IoIosClose } from 'react-icons/io';
import { AiOutlineBook } from 'react-icons/ai';
import Select from 'react-select';

import { Loading, StatusSelect, PageHeader, BookingItem, Glitch, AppButton } from '../../components';
import { useMergedState } from '../../helper/useMergedState';
import { getBookings, updateBooking, getUsers } from '../../api/admin';

import styles from './AdminHome.module.css';

const AdminHome = (props) => {
  const [state, setState] = useMergedState({
    bookingsLoading: true,
    bookings: [],
    bookingsError: null,
    selectedBooking: null,
    usersLoading: true,
    users: [],
    usersError: null,
    selectedCustomer: null,
  });

  const { token } = props;
  const {
    bookingsLoading,
    bookings,
    bookingsError,
    selectedBooking,
    users,
    usersLoading,
    usersError,
    selectedCustomer,
  } = state;

  useEffect(() => {
    loadBookingsFromApi();
    loadUsersFromApi();
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

  const loadUsersFromApi = async () => {
    try {
      if (!usersLoading) {
        setState({ usersLoading: true, usersError: null });
      }
      const result = await getUsers(token);
      const list = result.users.map(({ id, firstname, lastname }) => ({
        value: id,
        label: `${firstname} ${lastname}`,
      }));
      setState({ usersLoading: false, users: [...list] });
    } catch (err) {
      setState({ usersLoading: false, usersError: err.message });
    }
  };

  const toggleSelectedCustomer = (value) => {
    setState({ selectedCustomer: value });
  };

  const clearSelectedCustomer = () => {
    setState({ selectedCustomer: null });
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
    return <Loading text={bookingsLoading ? 'Loading Bookings' : 'Loading Users'} />;
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
    return (
      <Glitch text={bookingsError || usersError} onRetry={bookingsError ? loadBookingsFromApi : loadUsersFromApi} />
    );
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
    const arrayToRender = selectedCustomer
      ? bookings.filter(({ user: { id } }) => id === selectedCustomer.value)
      : [...bookings];
    const components = arrayToRender.map((booking) => {
      return <BookingItem item={booking} key={booking.id} onSelect={onBookingSelect} />;
    });

    return components;
  };

  const renderCustomerFilter = () => {
    return (
      <div className={styles.filter__div}>
        <label className={styles.filter__header}>Filter by Customer</label>
        <Select value={selectedCustomer} onChange={toggleSelectedCustomer} options={users} isClearable />
        <AppButton type="button" onClick={clearSelectedCustomer} text="Clear" containerStyle={{ marginTop: '25px' }} />
      </div>
    );
  };

  return bookingsLoading || usersLoading ? (
    renderLoading()
  ) : bookingsError || usersError ? (
    renderError()
  ) : bookings.length === 0 ? (
    renderEmpty()
  ) : (
    <div className={styles.main__div}>
      <div className={styles.booking__list}>
        <PageHeader text="All Bookings" />
        {renderCustomerFilter()}
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
