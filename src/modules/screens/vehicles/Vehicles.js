import React, { useEffect } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';

import { useMergedState } from '../../helper/useMergedState';
import { getVehicleList, getVehicleTypes } from '../../api/vehicles';
import { Vehicle, Loading, Glitch } from '../../components';

import styles from './Vehicles.module.css';

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
      setState({ vehiclesLoading: true, vehiclesError: null });
      const response = await getVehicleList(vehicleType);
      setState({ vehicles: response, vehiclesLoading: false });
    } catch (err) {
      setState({ vehiclesLoading: false, vehiclesError: err.message });
    }
  };

  const getVehicleTypesFromAPI = async () => {
    try {
      setState({ vehicleTypesLoading: true, vehicleTypesError: null });
      const response = await getVehicleTypes();
      const vehicleTypes = response.map(({ id, type }) => ({
        value: id,
        label: type
      }));
      setState({ vehicleTypes, vehicleTypesLoading: false });
    } catch (err) {
      setState({ vehicleTypesError: err.message, vehicleTypesLoading: false });
    }
  };

  const handleOnBookClick = id => {
    props.history.push(`/vehicles/${id}`);
  };

  const handleOnTypeChange = selectedValue => {
    const { value } = selectedValue;
    setState({
      vehiclesLoading: true,
      vehiclesError: null,
      selectedFilterType: selectedValue
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
    return (
      <div className={styles.vehicleTypeDivParent}>
        <label className={styles.vehicleTypeHeader}>VEHICLE TYPE:</label>
        <Select value={selectedFilterType} onChange={handleOnTypeChange} options={vehicleTypes} />
        <button type="button" className={styles.clearBtn} onClick={handleClearClick}>
          CLEAR
        </button>
      </div>
    );
  };

  const renderLoading = () => {
    return <Loading text="Loading" />;
  };

  const renderGlitch = () => {
    return (
      <Glitch
        text={vehicleTypesError || vehiclesError}
        onRetry={vehicleTypesError ? getVehicleTypesFromAPI : getVehiclesFromAPI}
      />
    );
  };

  const renderVehicleFilters = () => {
    const componentToRender = renderVehicleFilterList();
    return <div className={styles.filterListDiv}>{componentToRender}</div>;
  };

  return (
    <div className={styles.parentDiv}>
      {vehicleTypesLoading || vehiclesLoading ? (
        renderLoading()
      ) : vehicleTypesError || vehiclesError ? (
        renderGlitch()
      ) : (
        <div className={styles.childDiv}>
          {renderVehicleFilters()}
          {renderVehicleList()}
        </div>
      )}
    </div>
  );
};

export default withRouter(VehiclesScreen);
