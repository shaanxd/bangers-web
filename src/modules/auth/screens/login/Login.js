import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { withRouter } from 'react-router-dom';

import { login } from '../../actions/auth';

const LoginScreen = props => {
  const { isLoggingIn } = props.auth;

  const handleLoginSubmit = ({ username, password }, { setSubmitting }) => {
    props.loginUser({ username, password });
  };

  useEffect(() => {
    const { authDetails } = props.auth;

    if (authDetails) {
      props.history.replace('/');
    }
  });

  return (
    <div>
      <Formik
        initialValues={{ username: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.username) {
            errors.username = 'Username is required.';
          }
          if (!values.password) {
            errors.password = 'Password is required.';
          }
          return errors;
        }}
        onSubmit={handleLoginSubmit}
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
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" />
              <button type="submit" disabled={isLoggingIn}>
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
    loginUser: userData => {
      dispatch(login(userData));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
);
