import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import { AppInput, AppButton, PasswordInput, Separator } from '../../components';
import { useMergedState } from '../../helper/useMergedState';
import { postLogin } from '../../api/auth';
import { authSuccess } from '../../actions/auth';

import styles from './Login.module.css';

const LoginScreen = props => {
  const [state, setState] = useMergedState({
    loading: false,
    error: null
  });

  const { loading, error } = state;

  const handleLoginSubmit = async ({ email, password }) => {
    try {
      setState({ loading: true, error: null });
      const result = await postLogin(email, password);
      props.authSuccess(result);
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  return (
    <div className={styles.main__div}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={handleLoginSubmit}
      >
        {() => {
          return (
            <Form className={styles.login__form}>
              <span className={styles.form__header}>Hello there, let's login!</span>
              <AppInput
                containerStyle={{ marginTop: '10px' }}
                name="email"
                type="email"
                placeholder="someone@gmail.com"
                loading={loading}
              />
              <PasswordInput
                containerStyle={{ marginTop: '10px' }}
                name="password"
                placeholder="Password"
                loading={loading}
              />
              <AppButton type="submit" text="Login" containerStyle={{ marginTop: '5px' }} loading={loading} />
              {error && <label className={styles.main__error}>{error}</label>}
              <Separator />
              <AppButton
                type="button"
                onClick={() => {
                  window.location.href = `${process.env.REACT_APP_BASE_URL}auth/google`;
                }}
                text="Login with Google"
              />
              <AppButton
                type="button"
                onClick={() => {
                  window.location.href = `${process.env.REACT_APP_BASE_URL}auth/facebook`;
                }}
                text="Login with Facebook"
                containerStyle={{ marginTop: '10px' }}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: authData => {
      dispatch(authSuccess(authData));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginScreen));
