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

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
