export const login = userData => {
  return {
    type: LOGIN,
    payload: userData
  };
};

export const login_successful = payload => {
  return {
    type: LOGIN_SUCCESS,
    payload
  };
};

export const login_failure = payload => {
  return {
    type: LOGIN_FAILURE,
    payload
  };
};

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
