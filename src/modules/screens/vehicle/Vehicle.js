import React, { useEffect } from 'react';
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
import { useMergedState } from '../../helper/useMergedState';

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
      if (authDetails) {
        const startDateUTC = getDateStringInUTC(startDate);
        const returnDateUTC = getDateStringInUTC(returnDate);
        const response = await createBooking(
          {
            startDate: startDateUTC,
            returnDate: returnDateUTC,
            vehicleId: id,
            equipment: selectedEquipment
          },
          authDetails.authToken
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
    const carousal = renderImages();
    const { name } = vehicleDetails;
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
