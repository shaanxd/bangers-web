import createReducer from '../../helper/createReducer';
import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/auth';

export const initial_state = {
  authToken: null,
  isLoggingIn: false,
  loginError: null
};

export const login = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isLoggingIn: true
  };
};

export const login_success = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isLoggingIn: false,
    authToken: payload
  };
};

export const login_failure = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    isLoggingIn: false,
    loginError: payload
  };
};

export const authReducer = createReducer(initial_state, {
  [LOGIN]: login,
  [LOGIN_SUCCESS]: login_success,
  [LOGIN_FAILURE]: login_failure
});
