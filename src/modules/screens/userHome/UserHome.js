import React, { useEffect } from 'react';

import styles from './UserHome.module.css';
import { useMergedState } from '../../helper/useMergedState';
import { getVehicleList } from '../../api/vehicles';
import { Loading, Glitch, HomeCarousel } from '../../components';
import { withRouter } from 'react-router-dom';

const UserHome = (props) => {
  const [state, setState] = useMergedState({
    vehiclesLoading: true,
    vehiclesError: null,
    vehicles: [],
  });

  const { vehiclesLoading, vehiclesError, vehicles } = state;

  useEffect(() => {
    loadVehiclesFromApi();
    //eslint-disable-next-line
  }, []);

  const loadVehiclesFromApi = async () => {
    try {
      if (!vehiclesLoading) {
        setState({ vehiclesLoading: true, vehiclesError: null });
      }
      const result = await getVehicleList();
      setState({ vehiclesLoading: false, vehicles: [...result] });
    } catch (err) {
      setState({ vehiclesLoading: false, vehiclesError: err.message });
    }
  };

  const onVehicleClick = (id) => {
    props.history.push(`/vehicles/${id}`);
  };

  const onMoreClick = () => {
    props.history.push('/vehicles');
  };

  const renderLoading = () => {
    return <Loading text="Loading" />;
  };

  const renderError = () => {
    return <Glitch text={vehiclesError} onRetry={loadVehiclesFromApi} />;
  };

  const renderContent = () => {
    return (
      <div>
        <HomeCarousel onMoreClick={onMoreClick} onItemClick={onVehicleClick} items={vehicles} header="Our Fleet" />
      </div>
    );
  };

  return (
    <div className={styles.main__div}>
      {vehiclesLoading ? renderLoading() : vehiclesError ? renderError() : renderContent()}
    </div>
  );
};

export default withRouter(UserHome);
