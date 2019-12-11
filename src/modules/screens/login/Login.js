import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import GoogleLogin from 'react-google-login';

import './Login.css';
import '../../shared/css/Forms.css';
import { Icomoon } from '../../components';
import { login, auth_google } from '../../actions/auth';

const LoginScreen = props => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisible = () => {
    setPasswordVisible(prevPasswordVisible => !prevPasswordVisible);
  };
  const { isLoggingIn, loginError } = props.auth;

  const handleLoginSubmit = ({ username, password }, { setSubmitting }) => {
    props.loginUser({ username, password });
  };

  const handleGoogleLogin = response => {
    props.authGoogle({ accessToken: response.accessToken, origin: 'LOGIN' });
  };

  const handleGoogleError = () => {};

  const renderGoogleButton = ({ onClick, disabled }) => {
    return (
      <button className="form__submit-google" onClick={onClick}>
        <div className="form__submit-google-div">
          <Icomoon
            className="form__submit-google-icon"
            icon="google"
            size={30}
            color="#D2514D"
          />
          <label className="form__submit-google-label">Login with Google</label>
        </div>
      </button>
    );
  };

  useEffect(() => {
    const { authDetails } = props.auth;

    if (authDetails) {
      props.history.replace('/');
    }
  });

  const passwordParams = passwordVisible
    ? { type: 'text', icon: 'eye-blocked' }
    : { type: 'password', icon: 'eye' };

  return (
    <div className="login__body">
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={handleLoginSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form className="login__form">
              <span className="form__header">Hello there, let's login!</span>

              <Field
                className="form__input"
                type="username"
                name="username"
                placeholder="Enter Username"
              />
              <ErrorMessage name="username">
                {message => <label className="form__error">{message}</label>}
              </ErrorMessage>
              <div className="form__input-parent">
                <Field
                  className="form__input-nested"
                  type={passwordParams.type}
                  name="password"
                  placeholder="Enter Password"
                />
                <button
                  onClick={handlePasswordVisible}
                  className="form__button-hide"
                  type="button"
                >
                  <Icomoon
                    color="#888888"
                    icon={passwordParams.icon}
                    size={20}
                  />
                </button>
              </div>
              <ErrorMessage name="password">
                {message => <label className="form__error">{message}</label>}
              </ErrorMessage>
              <button
                className="form__submit"
                type="submit"
                disabled={isLoggingIn}
              >
                Login
              </button>
              {loginError && (
                <label className="form__error-main">{loginError}</label>
              )}
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Login with google"
                onSuccess={handleGoogleLogin}
                onFailure={handleGoogleError}
                render={renderGoogleButton}
              />
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
    },
    authGoogle: accessTokenData => {
      dispatch(auth_google(accessTokenData));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
);
