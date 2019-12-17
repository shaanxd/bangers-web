import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import './Vehicle.css';
import {
  getImageUrl,
  getTomorrow,
  getNextDate,
  getMinStartDate,
  getMinReturnDate,
  getMaxReturnDate,
  getDateStringInUTC
} from '../../helper/vehicleHelper';
import { getVehicle, createBooking } from '../../api/vehicles';

const VehicleScreen = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(getTomorrow());
  const [vehicleLoading, setVehicleLoading] = useState(true);
  const [vehicleError, setVehicleError] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);

  const {
    match: {
      params: { id }
    },
    auth: { authDetails }
  } = props;

  const getVehicleAPICall = () => {
    getVehicle(id)
      .then(response => {
        setVehicleLoading(false);
        setVehicleDetails(response);
      })
      .catch(err => {
        setVehicleLoading(false);
        setVehicleError(err.message);
      });
  };

  useEffect(
    () => {
      getVehicleAPICall();
    }, //eslint-disable-next-line
    []
  );

  const handleStartDateChange = selectedDate => {
    setStartDate(selectedDate);
    setReturnDate(getNextDate(selectedDate));
  };

  const handleReturnDateChange = selectedDate => {
    setReturnDate(selectedDate);
  };

  const handleBookClick = () => {
    setBookingLoading(true);
    setBookingError(null);
    if (authDetails) {
      const startDateUTC = getDateStringInUTC(startDate);
      const returnDateUTC = getDateStringInUTC(returnDate);
      createBooking(
        {
          startDate: startDateUTC,
          returnDate: returnDateUTC,
          vehicleId: vehicleDetails.id
        },
        authDetails.authToken
      )
        .then(response => {
          setBookingLoading(false);
        })
        .catch(err => {
          setBookingLoading(false);
          setBookingError(err.message);
        });
    } else {
      props.history.push('/login');
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
    const { image, name } = vehicleDetails;

    return (
      <div className="vehicle__display-div">
        <img src={getImageUrl(image)} alt="Sample" className="vehicle__image" />
        <h1 className="vehicle__label-header">{name}</h1>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          className="vehicle__datepicker"
          minDate={getMinStartDate()}
          dateFormat="MMMM d, yyyy h:mm aa"
          showTimeSelect
        />
        <DatePicker
          selected={returnDate}
          onChange={handleReturnDateChange}
          className="vehicle__datepicker"
          maxDate={getMaxReturnDate(startDate)}
          minDate={getMinReturnDate(startDate)}
          dateFormat="MMMM d, yyyy h:mm aa"
          showTimeSelect
        />
        {bookingLoading && <label>Loading</label>}
        <button
          type="button"
          onClick={handleBookClick}
          className="vehicle__button-book"
        >
          Book Now!
        </button>
        {bookingError && <label>{bookingError}</label>}
      </div>
    );
  };

  return vehicleError
    ? renderError()
    : vehicleLoading
    ? renderLoading()
    : vehicleDetails && renderVehicle();
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    vehicles: state.vehicles
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VehicleScreen)
);
