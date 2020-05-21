import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { IoIosClose } from 'react-icons/io';
import { Formik, Form } from 'formik';

import { PageHeader, Loading, Glitch, AppButton, AppInput } from '../../components';

import styles from './Equipment.module.css';
import { useMergedState } from '../../helper/useMergedState';
import { getEquipment } from '../../api/vehicles';
import { connect } from 'react-redux';
import { addEquipment } from '../../api/admin';

const Equipment = (props) => {
  const [state, setState] = useMergedState({
    loading: true,
    error: null,
    equipment: [],
    isAddSelected: false,
    isAddLoading: false,
    isAddError: null,
  });

  const { loading, error, equipment, isAddSelected, isAddLoading, isAddError } = state;
  const { token } = props;

  useEffect(
    () => {
      loadEquipmentFromApi();
    }, //eslint-disable-next-line
    []
  );

  const loadEquipmentFromApi = async () => {
    try {
      if (!loading) {
        setState({ loading: true, error: null });
      }
      const response = await getEquipment();
      setState({ loading: false, equipment: [...response] });
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  const toggleAddSelected = () => {
    setState({ isAddSelected: !isAddSelected });
  };

  const renderLoading = (text) => {
    return <Loading text={text} />;
  };

  const renderError = (text, callback) => {
    return <Glitch text={text} onRetry={callback} />;
  };

  const renderEquipmentList = () => {
    return equipment.map((item) => {
      return (
        <div className={styles.equipment__item}>
          <span>{item.name}</span>
        </div>
      );
    });
  };

  const handleAddEquipment = async ({ name }) => {
    try {
      setState({ isAddLoading: true, isAddError: null });
      await addEquipment({ name }, token);
      setState({ isAddLoading: false, isAddSelected: false });
      loadEquipmentFromApi();
    } catch (err) {
      setState({ isAddLoading: false, isAddError: err.message });
    }
  };

  const renderEquipments = () => {
    return (
      <div className={styles.equipment__div}>
        <PageHeader text="Equipment" />
        {renderEquipmentList()}
        <div className={styles.button__container}>
          <AppButton text="Add Equipment" onClick={toggleAddSelected} />
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
                  initialValues={{ name: '' }}
                  validationSchema={Yup.object().shape({
                    name: Yup.string().required('Equipment name is required'),
                  })}
                  onSubmit={handleAddEquipment}
                >
                  {() => {
                    return (
                      <Form>
                        <PageHeader text="Add Equipment" />
                        <AppInput
                          containerStyle={{ marginTop: '10px' }}
                          name="name"
                          type="text"
                          placeholder="Equipment name"
                          loading={isAddLoading}
                        />
                        <AppButton
                          type="submit"
                          text="Add Equipment"
                          containerStyle={{ marginTop: '10px' }}
                          loading={isAddLoading}
                        />
                        {isAddError && <label className={styles.add__error}>{isAddError}</label>}
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

  return (
    <div className={styles.root__div}>
      {loading
        ? renderLoading('Loading Equipment')
        : error
        ? renderError(error, loadEquipmentFromApi)
        : renderEquipments()}
    </div>
  );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Equipment));
