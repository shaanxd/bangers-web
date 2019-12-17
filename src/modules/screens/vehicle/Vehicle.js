import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import { get_vehicle } from '../../actions/vehicles';

import './Vehicle.css';
import { getImageUrl } from '../../helper/vehicleHelper';

const VehicleScreen = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());

  useEffect(
    () => {
      props.getVehicle(props.match.params.id);
    }, //eslint-disable-next-line
    []
  );

  const {
    selectedVehicle,
    getVehicleLoading,
    getVehicleError
  } = props.vehicles;

  const handleStartDateChange = selectedDate => {
    setStartDate(selectedDate);
  };

  const handleReturnDateChange = selectedDate => {
    setReturnDate(selectedDate);
  };

  const handleBookClick = () => {
    console.log('Booked');
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
        <h1>{getVehicleError}</h1>
      </div>
    );
  };

  const renderVehicle = () => {
    const { image, name } = selectedVehicle;

    return (
      <div className="vehicle__display-div">
        <img src={getImageUrl(image)} alt="Sample" className="vehicle__image" />
        <h1 className="vehicle__label-header">{name}</h1>
        <DatePicker
          showPopperArrow={false}
          selected={startDate}
          onChange={handleStartDateChange}
          className="vehicle__datepicker"
        />
        <DatePicker
          showPopperArrow={false}
          selected={returnDate}
          onChange={handleReturnDateChange}
          className="vehicle__datepicker"
        />
        <button
          type="button"
          onClick={handleBookClick}
          className="vehicle__button-book"
        >
          Book Now!
        </button>
      </div>
    );
  };
  return getVehicleError
    ? renderError()
    : getVehicleLoading
    ? renderLoading()
    : selectedVehicle && renderVehicle();
};

const mapStateToProps = state => {
  return {
    vehicles: state.vehicles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getVehicle: vehicleId => {
      dispatch(get_vehicle(vehicleId));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(VehicleScreen)
);
