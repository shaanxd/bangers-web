export const authSuccess = userData => {
  return {
    type: AUTH_SUCCESS,
    payload: userData
  };
};

export const checkAuthTimeout = payload => {
  return {
    type: CHECK_AUTH_TIMEOUT,
    payload
  };
};

export const checkAuthValid = payload => {
  return {
    type: CHECK_AUTH_VALID,
    payload
  };
};

export const checkAuthValidSuccess = payload => {
  return {
    type: CHECK_AUTH_VALID_SUCCESS,
    payload
  };
};

export const logoutUser = payload => {
  return {
    type: LOGOUT_USER,
    payload
  };
};

export const logoutSuccess = payload => {
  return {
    type: LOGOUT_SUCCESS,
    payload
  };
};

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const CHECK_AUTH_TIMEOUT = 'CHECK_AUTH_TIMEOUT';
export const CHECK_AUTH_VALID = 'CHECK_AUTH_VALID';
export const CHECK_AUTH_VALID_SUCCESS = 'CHECK_AUTH_VALID_SUCCESS';
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
