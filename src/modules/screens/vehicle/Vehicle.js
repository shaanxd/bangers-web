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
import { EquipmentSelect, CarImage } from '../../components';
import { useMergedState } from '../../helper/useMergedState';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './Vehicle.module.css';
import './Vehicle.css';

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
        setState({ bookingLoading: false });
      } else {
        props.history.push('/login');
      }
    } catch (err) {
      setState({ bookingLoading: false, bookingError: err.message });
    }
  };

  const renderLoading = () => {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  };

  const renderError = () => {
    return (
      <div>
        <h1>{vehicleError}</h1>
      </div>
    );
  };

  const renderVehicle = () => {
    const { name } = vehicleDetails;
    return (
      <div className={styles.parentDiv}>
        <div className={styles.childDiv}>
          <CarImage images={vehicleDetails.images} />
          <div className={styles.bookingDiv}>
            <label className={styles.vehicleHeader}>{name.toUpperCase()}</label>
            <label className={styles.datePickerLabel}>PICK-UP DATE</label>
            <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              className={styles.datePicker}
              minDate={getMinStartDate()}
              dateFormat="MMMM d, yyyy h:mm aa"
              showTimeSelect
            />
            <label className={styles.datePickerLabel}>DROP-OFF DATE</label>
            <DatePicker
              selected={returnDate}
              onChange={handleReturnDateChange}
              className={styles.datePicker}
              maxDate={getMaxReturnDate(startDate)}
              minDate={getMinReturnDate(startDate)}
              dateFormat="MMMM d, yyyy h:mm aa"
              showTimeSelect
            />
            {bookingLoading && <label>Loading</label>}
            <button type="button" onClick={handleBookClick} className={styles.bookBtn}>
              Book Now!
            </button>
            {bookingError && <label>{bookingError}</label>}
            {equipmentError ? (
              <label>{equipmentError}</label>
            ) : equipmentLoading ? (
              <label>Loading</label>
            ) : (
              <EquipmentSelect
                equipment={equipment}
                selectedEquipment={selectedEquipment}
                handleCheckedChange={handleCheckedChange}
              />
            )}
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
