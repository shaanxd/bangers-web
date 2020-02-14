import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import {
  getTomorrow,
  getNextDate,
  getMinStartDate,
  getMinReturnDate,
  getMaxReturnDate,
  getDateStringInUTC
} from '../../helper/vehicleHelper';
import { getVehicle, createBooking, getEquipment } from '../../api/vehicles';
import { EquipmentSelect, CarImage, PageHeader, AppButton, Loading, Glitch } from '../../components';
import { useMergedState } from '../../helper/useMergedState';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Vehicle.module.css';
import './Vehicle.css';
import { PulseLoader } from 'react-spinners';

const VehicleScreen = props => {
  const [state, setState] = useMergedState({
    startDate: new Date(),
    returnDate: getTomorrow(),
    vehicleLoading: true,
    vehicleError: null,
    vehicleDetails: null,
    bookingLoading: false,
    bookingError: null,
    equipment: [],
    equipmentLoading: true,
    equipmentError: null,
    selectedEquipment: []
  });

  const {
    startDate,
    returnDate,
    vehicleLoading,
    vehicleError,
    vehicleDetails,
    bookingLoading,
    bookingError,
    equipment,
    equipmentLoading,
    equipmentError,
    selectedEquipment
  } = state;

  const {
    match: {
      params: { id }
    },
    auth
  } = props;

  useEffect(
    () => {
      getVehicleAPICall();
      getEquipmentAPICall();
    }, //eslint-disable-next-line
    []
  );

  const getVehicleAPICall = async () => {
    try {
      setState({ vehicleLoading: false, vehicleError: null });
      const response = await getVehicle(id);
      setState({ vehicleLoading: false, vehicleDetails: response });
    } catch (err) {
      setState({ vehicleLoading: false, vehicleError: err.message });
    }
  };

  const getEquipmentAPICall = async () => {
    try {
      const response = await getEquipment();
      setState({ equipmentLoading: false, equipment: response });
    } catch (err) {
      setState({ equipmentLoading: false, equipmentError: err.message });
    }
  };

  const handleStartDateChange = selectedDate => {
    setState({
      startDate: selectedDate,
      returnDate: getNextDate(selectedDate)
    });
  };

  const handleReturnDateChange = selectedDate => {
    setState({ returnDate: selectedDate });
  };

  const handleCheckedChange = id => {
    let newArray;
    if (selectedEquipment.includes(id)) {
      newArray = selectedEquipment.filter(equipment => equipment !== id);
    } else {
      newArray = [...selectedEquipment, id];
    }
    setState({ selectedEquipment: newArray });
  };

  const handleBookClick = async () => {
    try {
      setState({ bookingLoading: true, bookingError: null });
      if (auth) {
        const startDateUTC = getDateStringInUTC(startDate);
        const returnDateUTC = getDateStringInUTC(returnDate);
        await createBooking(
          {
            startDate: startDateUTC,
            returnDate: returnDateUTC,
            vehicleId: id,
            equipment: selectedEquipment
          },
          auth.authToken
        );
        props.history.push('/bookings');
      } else {
        props.history.push('/login');
      }
    } catch (err) {
      setState({ bookingLoading: false, bookingError: err.message });
    }
  };

  const renderLoading = () => {
    return <Loading text="Loading" />;
  };

  const renderError = () => {
    return <Glitch text={vehicleError} onRetry={getVehicleAPICall} />;
  };

  const renderVehicle = () => {
    const { name } = vehicleDetails;
    return (
      <div className={styles.main__div}>
        <div className={styles.inner__div}>
          <PageHeader text={name.toUpperCase()} />
          <div className={styles.details__container}>
            <CarImage images={vehicleDetails.images} />
            <div className={styles.booking__div}>
              <label className={styles.date__label}>PICK-UP DATE</label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                className={styles.date__picker}
                minDate={getMinStartDate()}
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeSelect
                disabled={bookingLoading}
              />
              <label className={styles.date__label}>DROP-OFF DATE</label>
              <DatePicker
                selected={returnDate}
                onChange={handleReturnDateChange}
                className={styles.date__picker}
                maxDate={getMaxReturnDate(startDate)}
                minDate={getMinReturnDate(startDate)}
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeSelect
                disabled={bookingLoading}
              />
              <AppButton
                onClick={handleBookClick}
                text="BOOK NOW"
                loading={bookingLoading}
                containerStyle={{ marginTop: '20px' }}
              />
              {bookingError && <span className={styles.form__error}>{bookingError}</span>}
              {equipmentError ? (
                <span className={styles.form__error}>{equipmentError}</span>
              ) : equipmentLoading ? (
                <div className={styles.equipment__label}>
                  <PulseLoader size={10} />
                  <span>Loading Equipment</span>
                </div>
              ) : (
                <EquipmentSelect
                  equipment={equipment}
                  selectedEquipment={selectedEquipment}
                  handleCheckedChange={handleCheckedChange}
                  loading={bookingLoading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return vehicleError ? renderError() : vehicleLoading ? renderLoading() : vehicleDetails && renderVehicle();
};

const mapStateToProps = ({ auth: { auth } }) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VehicleScreen));
