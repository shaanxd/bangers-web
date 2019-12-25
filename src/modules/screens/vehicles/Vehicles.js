import React, { useEffect } from 'react';

import { useMergedState } from '../../helper/useMergedState';

import styles from './Vehicles.module.css';
import { getVehicleList, getVehicleTypes } from '../../api/vehicles';
import { Vehicle } from '../../components';

const VehiclesScreen = props => {
  const [state, setState] = useMergedState({
    vehicles: [],
    vehiclesLoading: true,
    vehiclesError: null,

    vehicleTypes: [],
    vehicleTypesLoading: true,
    vehicleTypesError: null,

    selectedFilterType: null
  });

  useEffect(
    () => {
      getVehiclesFromAPI();
      getVehicleTypesFromAPI();
    },
    //eslint-disable-next-line
    []
  );

  const {
    vehicles,
    vehiclesError,
    vehiclesLoading,
    vehicleTypes,
    vehicleTypesLoading,
    vehicleTypesError,
    selectedFilterType
  } = state;

  const getVehiclesFromAPI = async vehicleType => {
    try {
      const response = await getVehicleList(vehicleType);
      setState({ vehicles: response, vehiclesLoading: false });
    } catch (err) {
      setState({ vehiclesLoading: false, vehiclesError: err.message });
    }
  };

  const getVehicleTypesFromAPI = async () => {
    try {
      const response = await getVehicleTypes();
      setState({ vehicleTypes: response, vehicleTypesLoading: false });
    } catch (err) {
      setState({ vehicleTypesError: err.message, vehicleTypesLoading: false });
    }
  };

  const handleOnBookClick = () => {
    console.log('Booked');
  };

  const handleOnTypeChange = ({ target: { value } }) => {
    setState({
      vehiclesLoading: true,
      vehiclesError: null,
      selectedFilterType: value
    });
    getVehiclesFromAPI(value);
  };

  const handleClearClick = () => {
    setState({
      vehiclesLoading: true,
      vehiclesError: null,
      selectedFilterType: null
    });
    getVehiclesFromAPI();
  };

  const renderVehicleItem = (vehicle, key) => {
    return (
      <div className={styles.vehicleDiv}>
        <Vehicle vehicle={vehicle} onBookClick={handleOnBookClick} />
      </div>
    );
  };

  const renderVehicleList = () => {
    const listItems = vehicles.map((vehicle, index) => {
      return renderVehicleItem(vehicle, index);
    });
    return <div className={styles.vehicleListDiv}>{listItems}</div>;
  };

  const renderVehicleFilterList = () => {
    const listItems = vehicleTypes.map((vehicleType, index) => {
      return (
        <div className={styles.vehicleTypeDivChild}>
          <input
            type="radio"
            value={vehicleType.id}
            className={styles.vehicleTypeBtn}
            name="vehicleType"
            onChange={handleOnTypeChange}
            disabled={vehiclesLoading}
            checked={selectedFilterType === vehicleType.id}
          />
          <label className={styles.vehicleTypeLabel}>{vehicleType.type}</label>
        </div>
      );
    });

    return <div className={styles.vehicleTypeDivParent}>{listItems}</div>;
  };

  const renderVehicleFilters = () => {
    const componentToRender = vehicleTypesLoading ? (
      <label>Loading</label>
    ) : vehicleTypesError ? (
      <label>{vehicleTypesError}</label>
    ) : (
      renderVehicleFilterList()
    );
    return (
      <div className={styles.filterListDiv}>
        <label className={styles.vehicleTypeHeader}>VEHICLE TYPE:</label>
        {componentToRender}
        <button
          type="button"
          className={styles.clearBtn}
          onClick={handleClearClick}
        >
          Clear Filter
        </button>
      </div>
    );
  };

  const renderVehicleLoading = () => {
    return <div className={styles.loadingDiv}>Loading</div>;
  };

  const renderVehicleError = () => {
    return <div className={styles.errorDiv}>{vehiclesError}</div>;
  };

  console.log(state);

  return (
    <div className={styles.parentDiv}>
      {renderVehicleFilters()}
      {vehiclesLoading
        ? renderVehicleLoading()
        : vehiclesError
        ? renderVehicleError()
        : renderVehicleList()}
    </div>
  );
};

export default VehiclesScreen;
