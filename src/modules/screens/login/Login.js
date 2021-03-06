import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { AiFillFacebook, AiFillGoogleSquare } from 'react-icons/ai';

import { AppInput, AppButton, PasswordInput, Separator, PageHeader } from '../../components';
import { useMergedState } from '../../helper/useMergedState';
import { postLogin } from '../../api/auth';
import { authSuccess } from '../../actions/auth';

import styles from './Login.module.css';

const LoginScreen = (props) => {
  const [state, setState] = useMergedState({
    loading: false,
    error: null,
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
          email: Yup.string().email('Invalid email').required('Email is required'),
          password: Yup.string().required('Password is required'),
        })}
        onSubmit={handleLoginSubmit}
      >
        {() => {
          return (
            <Form className={styles.login__form}>
              <PageHeader text="Hello there, Let's Login!" />
              <span className={styles.form__span}>Email Address</span>
              <AppInput name="email" type="email" placeholder="someone@gmail.com" loading={loading} />
              <span className={styles.form__span}>Password</span>
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
                icon={AiFillGoogleSquare}
                size={35}
              />
              <AppButton
                type="button"
                onClick={() => {
                  window.location.href = `${process.env.REACT_APP_BASE_URL}auth/facebook`;
                }}
                text="Login with Facebook"
                containerStyle={{ marginTop: '10px' }}
                icon={AiFillFacebook}
                size={35}
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    authSuccess: (authData) => {
      dispatch(authSuccess(authData));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginScreen));
