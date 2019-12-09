import createReducer from '../helper/createReducer';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE
} from '../actions/auth';

export const initial_state = {
  authDetails: null,
  isLoggingIn: false,
  loginError: null,
  isSigningUp: false,
  signupError: null,
  isLoggingOut: false,
  logoutError: null
};

export const login = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isLoggingIn: true,
    loginError: null
  };
};

export const login_success = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isLoggingIn: false,
    authDetails: payload,
    loginError: null
  };
};

export const login_failure = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isLoggingIn: false,
    loginError: payload
  };
};

export const signup = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isSigningUp: true,
    signupError: null
  };
};

export const signup_success = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isSigningUp: false,
    authDetails: payload
  };
};

export const signup_failure = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isSigningUp: false,
    signupError: payload
  };
};

export const logout = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isLoggingOut: true,
    logoutError: null
  };
};

export const logout_success = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isLoggingOut: false,
    authDetails: null
  };
};

export const logout_failure = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isLoggingOut: false,
    logoutError: payload
  };
};

export const authReducer = createReducer(initial_state, {
  [LOGIN]: login,
  [LOGIN_SUCCESS]: login_success,
  [LOGIN_FAILURE]: login_failure,

  [SIGNUP]: signup,
  [SIGNUP_SUCCESS]: signup_success,
  [SIGNUP_FAILURE]: signup_failure,

  [LOGOUT]: logout,
  [LOGOUT_SUCCESS]: logout_success,
  [LOGOUT_FAILURE]: logout_failure
});
