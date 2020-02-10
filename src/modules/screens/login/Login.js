import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import * as Yup from 'yup';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import './Login.css';
import '../../shared/css/Forms.css';
import { login } from '../../actions/auth';

const LoginScreen = props => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handlePasswordVisible = () => {
    setPasswordVisible(prevPasswordVisible => !prevPasswordVisible);
  };
  const { isLoggingIn, loginError } = props.auth;

  const handleLoginSubmit = ({ email, password }, { setSubmitting }) => {
    props.loginUser({ email, password });
  };

  return (
    <div className="login__body">
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
        {({ isSubmitting }) => {
          return (
            <Form className="login__form">
              <span className="form__header">Hello there, let's login!</span>

              <Field className="form__input" type="email" name="email" placeholder="Enter Email" />
              <ErrorMessage name="email">{message => <label className="form__error">{message}</label>}</ErrorMessage>
              <div className="form__input-parent">
                <Field
                  className="form__input-nested"
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter Password"
                />
                <button onClick={handlePasswordVisible} className="form__button-hide" type="button">
                  {passwordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                </button>
              </div>
              <ErrorMessage name="password">{message => <label className="form__error">{message}</label>}</ErrorMessage>
              <button className="form__submit" type="submit" disabled={isLoggingIn}>
                Login
              </button>
              {loginError && <label className="form__error-main">{loginError}</label>}
              <div className="form__separator-div">
                <div className="form__separator-line" />
                <div className="form__separator-label-div">OR</div>
                <div className="form__separator-line" />
              </div>
              <a className="form__submit-google" href={`${process.env.REACT_APP_BASE_URL}auth/google`}>
                <div className="form__submit-google-div">
                  <div className="form__submit-google-label-div">
                    <label className="form__submit-google-label">Signup with Google</label>
                  </div>
                </div>
              </a>
              <a className="form__submit-facebook" href={`${process.env.REACT_APP_BASE_URL}auth/facebook`}>
                <div className="form__submit-google-div">
                  <div className="form__submit-google-label-div">
                    <label className="form__submit-facebook-label">Continue with Facebook</label>
                  </div>
                </div>
              </a>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginScreen));
