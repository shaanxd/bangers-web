import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import { PageHeader, Loading, Glitch, AppButton, AppInput } from '../../components';
import { useMergedState } from '../../helper/useMergedState';
import { getVehicleTypes } from '../../api/vehicles';

import styles from './VehicleType.module.css';
import { addVehicleType } from '../../api/admin';

const VehicleType = (props) => {
  const [state, setState] = useMergedState({
    loading: true,
    error: null,
    types: [],
    isAddSelected: false,
    addLoading: false,
    addError: null,
  });

  const { loading, error, types, isAddSelected, addLoading, addError } = state;
  const { token } = props;

  useEffect(
    () => {
      loadVehicleTypesFromApi();
    }, //eslint-disable-next-line
    []
  );

  const loadVehicleTypesFromApi = async () => {
    try {
      if (!loading) {
        setState({ loading: true, error: null });
      }
      const response = await getVehicleTypes();
      setState({ loading: false, types: [...response] });
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  const handleAddVehicleType = async (values) => {
    try {
      setState({
        addLoading: true,
        addError: null,
      });
      await addVehicleType(values, token);
      setState({ addLoading: false, isAddSelected: false });
      loadVehicleTypesFromApi();
    } catch (err) {
      setState({ addLoading: false, addError: err.message });
    }
  };

  const toggleAddSelected = () => {
    setState({ isAddSelected: !isAddSelected, addError: null });
  };

  const renderGlitch = () => {
    return <Glitch text={null} onRetry={null} />;
  };

  const renderLoading = () => {
    return <Loading text="Loading Types" />;
  };

  const renderVehicleTypesList = () => {
    return types.map(({ type, pricePerDay, numberOfSeats }) => {
      return (
        <div className={styles.type__item}>
          <span className={styles.item__name}>{type}</span>
          <span className={styles.item__values}>{pricePerDay.toFixed(2)}</span>
          <span className={styles.item__values}>{numberOfSeats}</span>
        </div>
      );
    });
  };

  const renderVehicleTypes = () => {
    return (
      <div className={styles.root__div}>
        <div className={styles.type__div}>
          <PageHeader text="Vehicle Types" />
          <div className={styles.type__item}>
            <span className={styles.item__name}>Vehicle Type</span>
            <span className={styles.item__values}>Price per Day ($)</span>
            <span className={styles.item__values}>Number of seats</span>
          </div>
          {renderVehicleTypesList()}
          <AppButton
            text="Add Vehicle Type"
            onClick={toggleAddSelected}
            type="button"
            containerStyle={{ marginTop: '20px', marginBottom: '40px' }}
          />
        </div>
        {isAddSelected && (
          <div className={styles.modal__div}>
            <div className={styles.backdrop__div} onClick={toggleAddSelected}></div>
            <div className={styles.side__drawer}>
              <div className={styles.close__div}>
                <button type="button" className={styles.close__button} onClick={toggleAddSelected}>
                  <IoIosClose size={20} />
                  <span>CLOSE</span>
                </button>
              </div>
              <div className={styles.flex__div} />
              <div className={styles.form__div}>
                <Formik
                  initialValues={{ type: '', pricePerDay: 0.0, numberOfSeats: 0 }}
                  validationSchema={Yup.object().shape({
                    type: Yup.string().required('Vehilce type is required.'),
                    pricePerDay: Yup.number()
                      .typeError('Price must be a number')
                      .required('Price is required')
                      .positive('Price must be more than zero'),
                    numberOfSeats: Yup.number()
                      .typeError('Price must be a number')
                      .required('Price is required')
                      .positive('Price must be more than zero'),
                  })}
                  onSubmit={handleAddVehicleType}
                >
                  {() => {
                    return (
                      <Form>
                        <PageHeader text="Add Type" />
                        <AppInput
                          containerStyle={{ marginTop: '10px' }}
                          name="type"
                          type="text"
                          placeholder="Type name"
                          loading={addLoading}
                        />
                        <div className={styles.horizontal__div}>
                          <div className={styles.form__group}>
                            <span>Price per day</span>
                            <AppInput name="pricePerDay" type="text" placeholder="0.0" loading={addLoading} />
                          </div>
                          <div className={styles.separator__div} />
                          <div className={styles.form__group}>
                            <span>Number of seats</span>
                            <AppInput name="numberOfSeats" type="text" placeholder="0.0" loading={addLoading} />
                          </div>
                        </div>
                        <AppButton
                          type="submit"
                          text="Add Vehicle Type"
                          containerStyle={{ marginTop: '10px' }}
                          loading={addLoading}
                        />
                        {addError && <label className={styles.add__error}>{addError}</label>}
                      </Form>
                    );
                  }}
                </Formik>
              </div>
              <div className={styles.flex__div} />
            </div>
          </div>
        )}
      </div>
    );
  };

  return loading ? renderLoading() : error ? renderGlitch() : renderVehicleTypes();
};

const mapStateToProps = ({
  auth: {
    auth: { authToken: token },
  },
}) => {
  return {
    token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VehicleType));
