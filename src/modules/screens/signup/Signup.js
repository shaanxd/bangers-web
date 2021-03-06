import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import { PasswordInput, AppInput, AppButton, Separator, PageHeader } from '../../components';
import { useMergedState } from '../../helper/useMergedState';
import { postSignup } from '../../api/auth';
import { authSuccess } from '../../actions/auth';

import styles from './Signup.module.css';
import { AiFillGoogleSquare, AiFillFacebook } from 'react-icons/ai';

const SignupScreen = (props) => {
  const [state, setState] = useMergedState({
    loading: false,
    error: null,
  });

  const { loading, error } = state;

  const handleSignupSubmit = async ({ confirmPassword, ...rest }) => {
    try {
      setState({ loading: true, error: null });
      const result = await postSignup({ ...rest });
      props.authSuccess(result);
    } catch (err) {
      setState({ loading: false, error: err.message });
    }
  };

  return (
    <div className={styles.main__div}>
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          license: '',
          password: '',
          email: '',
          confirmPassword: '',
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().required('Firstname is required'),
          lastname: Yup.string().required('Lastname is required'),
          email: Yup.string().email('Invalid Email').required('Email is required'),
          license: Yup.string()
            .required('License is required')
            .min('5', 'Invalid license number')
            .max(10, 'Invalid license number'),
          password: Yup.string().min(5, 'Password is too short').required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required'),
        })}
        onSubmit={handleSignupSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form className={styles.signup__form}>
              <PageHeader text="Hello there, Let's Signup!" />
              <div className={styles.name__div}>
                <div className={styles.nested__div}>
                  <span className={styles.form__span}>First name</span>
                  <AppInput name="firstname" type="text" placeholder="John" loading={loading} />
                </div>
                <div className={styles.separator__div} />
                <div className={styles.nested__div}>
                  <span className={styles.form__span}>Last name</span>
                  <AppInput name="lastname" type="text" placeholder="Doe" loading={loading} />
                </div>
              </div>
              <span className={styles.form__span}>Email Address</span>
              <AppInput name="email" type="email" placeholder="someone@gmail.com" loading={loading} />
              <span className={styles.form__span}>License</span>
              <AppInput name="license" type="text" placeholder="H1RJHJKE" loading={loading} />
              <span className={styles.form__span}>Password</span>
              <PasswordInput name="password" placeholder="Enter Password" loading={loading} />
              <span className={styles.form__span}>Repeat Password</span>
              <PasswordInput name="confirmPassword" placeholder="Repeat Password" loading={loading} />
              <AppButton text="Signup" type="submit" loading={loading} containerStyle={{ marginTop: '5px' }} />
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

const mapStateToProps = ({ auth: { auth } }, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    authSuccess: (authData) => {
      dispatch(authSuccess(authData));
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupScreen));
