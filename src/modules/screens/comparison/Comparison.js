import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import styles from './Comparison.module.css';
import { useMergedState } from '../../helper/useMergedState';
import { Loading, Glitch, PageHeader } from '../../components';
import { getRates } from '../../api/vehicles';

const Comparison = (props) => {
  const [state, setState] = useMergedState({
    loading: true,
    error: null,
    rates: null,
  });

  const { loading, error, rates } = state;

  useEffect(
    () => {
      loadRatesFromApi();
    }, //eslint-disable-next-line
    []
  );

  const loadRatesFromApi = async () => {
    try {
      if (!loading) {
        setState({ loading: true, error: null, rates: null });
      }
      const result = await getRates();
      setState({ loading: false, rates: result });
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  const renderLoading = () => {
    return <Loading text="Loading Rates" />;
  };

  const renderError = () => {
    return <Glitch text={error} onRetry={loadRatesFromApi} />;
  };

  const renderExternalVehicleList = () => {
    return rates.external.map((vehicle) => {
      const { name, ratePerMonth, ratePerWeek, over80Km } = vehicle;
      return (
        <div className={styles.vehicle__div}>
          <span className={styles.name__span}>{name}</span>
          <span className={styles.fixed__span}>{ratePerMonth}</span>
          <span className={styles.fixed__span}>{ratePerWeek}</span>
          <span className={styles.fixed__span}>{over80Km}</span>
        </div>
      );
    });
  };

  const renderRates = () => {
    return (
      <div className={styles.rates__div}>
        <PageHeader text="Rates Comparison" />
        <span>
          Bangers offers competitive prices compared to other vendors. Below are the prices quoted by malkey.lk rental
          services as of today.
        </span>
        <div className={styles.external__div}>
          <div className={styles.header__div}>
            <span className={styles.name__span}>Vehicle</span>
            <span className={styles.fixed__span}>Per month (LKR)</span>
            <span className={styles.fixed__span}>Per week (LKR)</span>
            <span className={styles.fixed__span}>Extra Mileage</span>
          </div>
          {renderExternalVehicleList()}
        </div>
      </div>
    );
  };

  return <div className={styles.root__div}>{loading ? renderLoading() : error ? renderError() : renderRates()}</div>;
};

export default withRouter(Comparison);
