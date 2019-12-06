import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { withRouter } from 'react-router-dom';

import { login } from '../../actions/auth';

class LoginScreen extends Component {
  componentDidUpdate() {
    if (this.props.auth.authToken) {
      this.props.history.replace('/');
    }
  }
  handleLoginSubmit = ({ username, password }, { setSubmitting }) => {
    this.props.loginUser({ username, password });
  };
  render() {
    const { isLoggingIn } = this.props.auth;
    return (
      <div>
        <h1>{JSON.stringify(this.props.auth)}</h1>
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
          onSubmit={this.handleLoginSubmit}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
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
  }
}

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
