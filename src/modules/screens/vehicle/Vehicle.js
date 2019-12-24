import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import Slider from 'react-slick';

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
import { getVehicle, createBooking, getEquipment } from '../../api/vehicles';
import { EquipmentSelect } from '../../components';

const VehicleScreen = props => {
  const [startDate, setStartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(getTomorrow());
  const [vehicleLoading, setVehicleLoading] = useState(true);
  const [vehicleError, setVehicleError] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [equipment, setEquipment] = useState([]);
  const [equipmentLoading, setEquipmentLoading] = useState(true);
  const [equipmentError, setEquipmentError] = useState(null);
  const [selectedEquipment, setSelectedEquipment] = useState([]);

  const {
    match: {
      params: { id }
    },
    auth: { authDetails }
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
      setVehicleLoading(false);
      setVehicleDetails(response);
    } catch (err) {
      setVehicleLoading(false);
      setVehicleError(err.message);
    }
  };

  const getEquipmentAPICall = async () => {
    try {
      const response = await getEquipment();
      setEquipmentLoading(false);
      setEquipment(response);
    } catch (err) {
      setEquipmentLoading(false);
      setEquipmentError(err.message);
    }
  };

  const handleStartDateChange = selectedDate => {
    setStartDate(selectedDate);
    setReturnDate(getNextDate(selectedDate));
  };

  const handleReturnDateChange = selectedDate => {
    setReturnDate(selectedDate);
  };

  const handleCheckedChange = id => {
    let newArray;
    if (selectedEquipment.includes(id)) {
      newArray = selectedEquipment.filter(equipment => equipment !== id);
    } else {
      newArray = [...selectedEquipment, id];
    }
    setSelectedEquipment(newArray);
  };

  const handleBookClick = async () => {
    try {
      setBookingLoading(true);
      setBookingError(null);
      if (authDetails) {
        const startDateUTC = getDateStringInUTC(startDate);
        const returnDateUTC = getDateStringInUTC(returnDate);
        const response = await createBooking(
          {
            startDate: startDateUTC,
            returnDate: returnDateUTC,
            vehicleId: vehicleDetails.id,
            equipment: selectedEquipment
          },
          authDetails.authToken
        );
        setBookingLoading(false);
      } else {
        props.history.push('/login');
      }
    } catch (err) {
      setBookingLoading(false);
      setBookingError(err.message);
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

  const renderImages = () => {
    var settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0
    };
    const { images } = vehicleDetails;
    const imageComponents = images.map((imageUrl, index) => (
      <img
        key={index}
        className="vehicle__image"
        src={getImageUrl(imageUrl)}
        alt="Sample"
      />
    ));
    return <Slider {...settings}>{imageComponents}</Slider>;
  };

  const renderVehicle = () => {
    const { name } = vehicleDetails;
    const carousal = renderImages();

    return (
      <div className="vehicle__display-div">
        <div className="vehicle__display-inner-div">
          <div className="vehicle__image-div">{carousal}</div>
          <div className="vehicle__booking-div">
            <label className="vehicle__label-header">{name}</label>
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
