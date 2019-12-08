import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';

import './Signup.css';

import { signup } from '../../actions/auth';

const SignupScreen = props => {
  const handleSignupSubmit = (values, { setSubmitting }) => {
    const { username, email, password } = values;

    props.signupUser({ username, email, password });
  };

  useEffect(() => {
    const { authDetails } = props.auth;

    if (authDetails) {
      props.history.replace('/');
    }
  });

  const { isSigningUp } = props.auth;
  return (
    <div className="signup__body">
      <Formik
        initialValues={{
          firstname: '',
          lastname: '',
          username: '',
          password: '',
          email: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
          firstname: Yup.string().required('Firstname is required'),
          lastname: Yup.string().required('Lastname is required'),
          username: Yup.string().required('Username is required'),
          email: Yup.string()
            .email('Invalid Email')
            .required('Email is required'),
          password: Yup.string()
            .min(5, 'Password is too short')
            .required('Password is required'),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Password confirmation is required')
        })}
        onSubmit={handleSignupSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="signup__form">
              <span className="form__header">SIGNUP</span>
              <div className="form__name-parent">
                <div className="form__name-child">
                  <Field
                    className="form__input form__name-input"
                    type="text"
                    name="firstname"
                    placeholder="Enter Firstname"
                  />
                  <ErrorMessage name="firstname">
                    {message => (
                      <label className="form__error">{message}</label>
                    )}
                  </ErrorMessage>
                </div>
                <span className="form__name-space" />
                <div className="form__name-child">
                  <Field
                    className="form__input form__name-input"
                    type="text"
                    name="lastname"
                    placeholder="Enter Lastname"
                  />
                  <ErrorMessage name="lastname">
                    {message => (
                      <label className="form__error">{message}</label>
                    )}
                  </ErrorMessage>
                </div>
              </div>

              <Field
                className="form__input"
                type="username"
                name="username"
                placeholder="Enter Username"
              />
              <ErrorMessage name="username">
                {message => <label className="form__error">{message}</label>}
              </ErrorMessage>
              <Field
                className="form__input"
                type="email"
                name="email"
                placeholder="Enter Email"
              />
              <ErrorMessage name="email">
                {message => <label className="form__error">{message}</label>}
              </ErrorMessage>
              <div className="form__input-parent">
                <Field
                  className="form__input-nested"
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                />
                <button className="form__button-hide" type="button"></button>
              </div>
              <ErrorMessage name="password">
                {message => <label className="form__error">{message}</label>}
              </ErrorMessage>
              <div className="form__input-parent">
                <Field
                  className="form__input-nested"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
                <button className="form__button-hide" type="button"></button>
              </div>
              <ErrorMessage name="confirmPassword">
                {message => <label className="form__error">{message}</label>}
              </ErrorMessage>

              <button
                className="form__submit"
                type="submit"
                disabled={isSigningUp}
              >
                SIGNUP
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

const mapStateToProps = ({ auth }, ownProps) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signupUser: userData => {
      dispatch(signup(userData));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SignupScreen)
);
