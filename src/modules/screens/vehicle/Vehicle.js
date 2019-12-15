import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { get_vehicle } from '../../actions/vehicles';

const VehicleScreen = props => {
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
    return (
      <div>
        <h1>{JSON.stringify(selectedVehicle)}</h1>
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
