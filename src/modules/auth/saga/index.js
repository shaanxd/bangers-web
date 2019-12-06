import { takeEvery, put, call } from 'redux-saga/effects';

import {
  LOGIN,
  login_successful,
  login_failure,
  signup_successful,
  SIGNUP,
  signup_failure
} from '../actions/auth';

/* METHOD TO MAKE REQUEST TO LOGIN
TO DO MOVE BASEURL TO ENV AND MODE THIS TO SEPARATE MODULE */
const login_request = async (username, password) => {
  const endpoint = 'users/login';
  return api_post(endpoint, { username, password });
};

/* METHOD TO MAKE REQUEST TO SIGNUP
TO DO MOVE BASEURL TO ENV AND MODE THIS TO SEPARATE MODULE */
const signup_request = async userData => {
  const endpoint = 'users/signup';
  return api_post(endpoint, { ...userData });
};

/* METHOD TO MAKE POST REQUESTS
TO DO MOVE THIS TO A SEPARATE MODULE */
const api_post = async (endpoint, requestBody, authorization) => {
  const url = `${process.env.REACT_APP_BASE_URL}${endpoint}`;
  const body = JSON.stringify(requestBody);
  const headers = authorization
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authorization}`
      }
    : {
        'Content-Type': 'application/json'
      };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body
  });

  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(data.message);
  }
  return data;
};

/* function executed by the watcher saga when login is dispatched */
function* handleLoginSaga({ type, payload: { username, password } }) {
  try {
    const response = yield call(login_request, username, password);
    yield put(login_successful(response));
  } catch (err) {
    yield put(login_failure(err.message));
  }
}

function* handleSignupSaga({ type, payload }) {
  try {
    const response = yield call(signup_request, payload);
    yield put(signup_successful(response));
  } catch (err) {
    yield put(signup_failure(err.message));
  }
}

/* 
Watches LOGIN action dispatches. Is imported in root saga.js
file and yielded in array along with other sagas to make root
saga which is then run in the configureStore function in store.js
*/
function* watchLogin() {
  yield takeEvery(LOGIN, handleLoginSaga);
}

function* watchSignup() {
  yield takeEvery(SIGNUP, handleSignupSaga);
}

export { watchLogin, watchSignup };
