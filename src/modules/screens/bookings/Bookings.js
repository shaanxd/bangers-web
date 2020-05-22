import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { BookingItem, ExtendBooking, PageHeader, Loading, Glitch } from '../../components';
import { getBookings } from '../../api/user';
import { useMergedState } from '../../helper/useMergedState';

import styles from './Bookings.module.css';
import { extendBooking, getEquipment, addAdditionalEquipment } from '../../api/vehicles';
import { getDateStringInUTC } from '../../helper/vehicleHelper';
import { IoIosClose } from 'react-icons/io';

const Bookings = (props) => {
  const [state, setState] = useMergedState({
    loading: true,
    error: null,
    bookings: [],
    selectedBooking: null,
    extensionLoading: false,
    extensionError: null,
    equipmentLoading: true,
    equipment: [],
    equipmentError: null,
    addEquipmentLoading: false,
    addEquipmentError: null,
  });

  const {
    loading,
    bookings,
    selectedBooking,
    error,
    extensionLoading,
    extensionError,
    equipmentLoading,
    equipment,
    equipmentError,
    addEquipmentLoading,
    addEquipmentError,
  } = state;

  useEffect(
    () => {
      loadBookingsFromApi();
      loadEquipmentFromApi();
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

  const loadEquipmentFromApi = async () => {
    try {
      if (!equipmentLoading) {
        setState({ equipmentLoading: true, equipmentError: null });
      }
      const result = await getEquipment();
      setState({ equipmentLoading: false, equipment: [...result] });
    } catch (err) {
      setState({ equipmentLoading: false, equipmentError: err.message });
    }
  };

  const onExtensionSubmit = async ({ bookingId, returnDate }) => {
    try {
      setState({ extensionLoading: true, extensionError: null });
      const body = {
        bookingId,
        returnDate: getDateStringInUTC(returnDate),
      };
      await extendBooking(body, token);
      setState({ selectedBooking: null, extensionLoading: false });
      loadBookingsFromApi();
    } catch (err) {
      setState({ extensionLoading: false, extensionError: err.message });
    }
  };

  const onAddEquipmentSubmit = async (values) => {
    try {
      setState({ addEquipmentLoading: true, addEquipmentError: null });
      const equipmentList = values.equipment.map((item) => item.value);
      const body = {
        equipment: equipmentList,
        id: values.bookingId,
      };
      await addAdditionalEquipment(body, token);
      setState({ addEquipmentLoading: false });
      loadBookingsFromApi();
    } catch (err) {
      setState({ addEquipmentLoading: false, addEquipmentError: err.message });
    }
  };

  const renderBookingList = () => {
    const components = bookings.map((booking) => {
      return <BookingItem item={booking} key={booking.id} onSelect={onBookingSelect} />;
    });

    return components;
  };

  const onBookingSelect = (booking) => {
    setState({ selectedBooking: { ...booking } });
  };

  const onBookingDeSelect = () => {
    if (!extensionLoading) {
      setState({ selectedBooking: null });
    }
  };

  const renderBookings = () => {
    return (
      <div className={styles.main__div}>
        <div className={styles.booking__list}>
          <PageHeader text="Your Bookings" />
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
              <ExtendBooking
                equipment={equipment}
                booking={selectedBooking}
                onSubmit={onExtensionSubmit}
                onAddEquipmentSubmit={onAddEquipmentSubmit}
                loading={extensionLoading || addEquipmentLoading}
                addEquipmentError={addEquipmentError}
                extensionError={extensionError}
              />
              <div className={styles.flex__div} />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderLoading = () => {
    return (
      <div className={styles.main__div}>
        <Loading text={loading ? 'Loading Bookings' : 'Loading Equipment'} />
      </div>
    );
  };

  const renderGlitch = () => {
    return (
      <div className={styles.main__div}>
        <Glitch text={error ? error : equipmentError} onRetry={error ? loadBookingsFromApi : loadEquipmentFromApi} />
      </div>
    );
  };

  return loading || equipmentLoading ? renderLoading() : error || equipmentError ? renderGlitch() : renderBookings();
};

const mapStateToProps = ({
  auth: {
    auth: { authToken: token },
  },
}) => {
  return { token };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookings);
