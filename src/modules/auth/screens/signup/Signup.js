import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { withRouter } from 'react-router-dom';

import { signup } from '../../actions/auth';

class SignupScreen extends Component {
  componentDidUpdate() {
    if (this.props.auth.authDetails) {
      this.props.history.replace('/');
    }
  }
  handleSignupSubmit = (values, { setSubmitting }) => {
    const { username, email, password } = values;

    this.props.signupUser({ username, email, password });
  };

  render() {
    const { isSigningUp } = this.props.auth;
    return (
      <div>
        <Formik
          initialValues={{
            username: '',
            password: '',
            email: '',
            confirmPassword: ''
          }}
          validate={values => {
            const { username, password, email, confirmPassword } = values;
            const errors = {};
            if (!username) {
              errors.username = 'Username is required.';
            }
            if (!password) {
              errors.password = 'Password is required.';
            }
            if (!email) {
              errors.email = 'Email is required';
            }
            if (!confirmPassword) {
              errors.confirmPassword = 'Password confirmation is required.';
            } else if (confirmPassword !== password) {
              errors.confirmPassword = 'Passwords should match.';
            }
            return errors;
          }}
          onSubmit={this.handleSignupSubmit}
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
  }
}

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
