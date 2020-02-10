import createReducer from '../helper/createReducer';
import { AUTH_SUCCESS, CHECK_AUTH_VALID_SUCCESS, LOGOUT_USER, LOGOUT_SUCCESS } from '../actions/auth';

const initialState = {
  auth: null,
  checkAuthLoading: true,
  logoutLoading: false
};

const authSuccess = (state = initialState, { type, payload }) => {
  return {
    ...state,
    auth: payload
  };
};

const checkAuthValidSuccess = (state = initialState, { type, payload }) => {
  return {
    ...state,
    auth: payload,
    checkAuthLoading: false
  };
};

const logoutUser = (state = initialState, { type, payload }) => {
  return {
    ...state,
    logoutLoading: true
  };
};

const logoutSuccess = (state = initialState, { type, payload }) => {
  return {
    ...state,
    logoutLoading: false,
    auth: null
  };
};

export const auth = createReducer(initialState, {
  [AUTH_SUCCESS]: authSuccess,
  [CHECK_AUTH_VALID_SUCCESS]: checkAuthValidSuccess,
  [LOGOUT_USER]: logoutUser,
  [LOGOUT_SUCCESS]: logoutSuccess
});
