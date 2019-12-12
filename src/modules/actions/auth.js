export const login = userData => {
  return {
    type: LOGIN,
    payload: userData
  };
};

export const login_successful = authData => {
  return {
    type: LOGIN_SUCCESS,
    payload: authData
  };
};

export const login_failure = error => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  };
};

export const signup = userData => {
  return {
    type: SIGNUP,
    payload: userData
  };
};

export const signup_successful = authData => {
  return {
    type: SIGNUP_SUCCESS,
    payload: authData
  };
};

export const signup_failure = error => {
  return {
    type: SIGNUP_FAILURE,
    payload: error
  };
};

export const logout = userData => {
  return {
    type: LOGOUT,
    payload: userData
  };
};

export const logout_success = payload => {
  return {
    type: LOGOUT_SUCCESS,
    payload
  };
};

export const logout_failure = error => {
  return {
    type: LOGOUT_FAILURE,
    payload: error
  };
};

export const check_auth_state = payload => {
  return {
    type: CHECK_AUTH_STATE,
    payload
  };
};

export const check_auth_timeout = payload => {
  return {
    type: CHECK_AUTH_TIMEOUT,
    payload
  };
};

export const auth_redirect = payload => {
  return {
    type: AUTH_REDIRECT,
    payload
  };
};

export const auth_redirect_success = payload => {
  return {
    type: AUTH_REDIRECT_SUCCESS,
    payload
  };
};

export const auth_redirect_failure = payload => {
  return {
    type: AUTH_REDIRECT_FAILURE,
    payload
  };
};

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGOUT = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const CHECK_AUTH_STATE = 'CHECK_AUTH_STATE';
export const CHECK_AUTH_TIMEOUT = 'CHECK_AUTH_TIMEOUT';

export const AUTH_REDIRECT = 'AUTH_REDIRECT';
export const AUTH_REDIRECT_SUCCESS = 'AUTH_REDIRECT_SUCCESS';
export const AUTH_REDIRECT_FAILURE = 'AUTH_REDIRECT_FAILURE';
