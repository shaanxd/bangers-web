import React, { useEffect } from 'react';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';

import { useMergedState } from '../../helper/useMergedState';
import { getVehicleList, getVehicleTypes } from '../../api/vehicles';
import { Vehicle, Loading, Glitch, PageHeader, AppButton } from '../../components';

import styles from './Vehicles.module.css';
import { connect } from 'react-redux';
import { USER_TYPES } from '../../constants/constants';

const VehiclesScreen = (props) => {
  const [state, setState] = useMergedState({
    vehicles: [],
    vehiclesLoading: true,
    vehiclesError: null,

    vehicleTypes: [],
    vehicleTypesLoading: true,
    vehicleTypesError: null,

    selectedFilterType: null,
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
    selectedFilterType,
  } = state;

  const getVehiclesFromAPI = async (vehicleType) => {
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
        label: type,
      }));
      setState({ vehicleTypes, vehicleTypesLoading: false });
    } catch (err) {
      setState({ vehicleTypesError: err.message, vehicleTypesLoading: false });
    }
  };

  const handleOnBookClick = (id) => {
    if (props.auth && props.auth.userType === USER_TYPES.ADMIN) {
      return;
    }
    props.history.push(`/vehicles/${id}`);
  };

  const handleOnTypeChange = (selectedValue) => {
    const { value } = selectedValue;
    setState({
      vehiclesLoading: true,
      vehiclesError: null,
      selectedFilterType: selectedValue,
    });
    getVehiclesFromAPI(value);
  };

  const handleClearClick = () => {
    setState({
      vehiclesLoading: true,
      vehiclesError: null,
      selectedFilterType: null,
    });
    getVehiclesFromAPI();
  };

  const renderVehicleItem = (vehicle, key) => {
    return (
      <div className={styles.vehicleDiv} key={key}>
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

  const handleAddVehicleClick = () => {
    props.history.push('/add-vehicle');
  };

  const renderVehicleFilterList = () => {
    return (
      <div className={styles.vehicleTypeDivParent}>
        <label className={styles.vehicleTypeHeader}>Filter by vehicle type</label>
        <Select value={selectedFilterType} onChange={handleOnTypeChange} options={vehicleTypes} />
        {props.auth && props.auth.userType === USER_TYPES.ADMIN ? (
          <div className={styles.button__container}>
            <AppButton type="button" onClick={handleClearClick} text="Clear" />
            <div className={styles.separator} />
            <AppButton type="button" onClick={handleAddVehicleClick} text="Add Vehicle" />
          </div>
        ) : (
          <div className={styles.button__container}>
            <AppButton type="button" onClick={handleClearClick} text="Clear" />
          </div>
        )}
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
          <PageHeader text="Our Fleet" />
          {renderVehicleFilters()}
          {renderVehicleList()}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth: { auth } }) => {
  return {
    auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VehiclesScreen));
