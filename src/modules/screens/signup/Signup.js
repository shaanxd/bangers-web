import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';

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
    <div>
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
          confirmPassword: ''
        }}
        validationSchema={Yup.object().shape({
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
            <Form
              style={{
                border: '1px solid black',
                padding: '50px',
                width: '300px',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <label>Username</label>
              <Field type="username" name="username" />
              <ErrorMessage name="username" />

              <label>Email</label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" />

              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" />

              <label>Confirm Password</label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" />

              <button type="submit" disabled={isSigningUp}>
                Submit
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
