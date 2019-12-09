import { takeEvery, put, call } from 'redux-saga/effects';
import { setAuthDetails, removeAuthDetails } from '../helper/localStorage';

import {
  LOGIN,
  login_successful,
  login_failure,
  signup_successful,
  SIGNUP,
  signup_failure,
  logout_failure,
  logout_success,
  LOGOUT
} from '../actions/auth';

import { postLogin, postSignup } from '../api/auth';

/* function executed by the watcher saga when login is dispatched */
function* handleLoginSaga({ type, payload: { username, password } }) {
  try {
    const response = yield call(postLogin, username, password);
    response.authToken && setAuthDetails(response);
    yield put(login_successful(response));
  } catch (err) {
    yield put(login_failure(err.message));
  }
}

function* handleSignupSaga({ type, payload }) {
  try {
    const response = yield call(postSignup, payload);
    response.authToken && setAuthDetails(response);
    yield put(signup_successful(response));
  } catch (err) {
    yield put(signup_failure(err.message));
  }
}

function* handleLogoutSaga({ type, payload }) {
  try {
    removeAuthDetails();
    yield put(logout_success());
  } catch (err) {
    yield put(logout_failure(err.message));
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

function* watchLogout() {
  yield takeEvery(LOGOUT, handleLogoutSaga);
}

export { watchLogin, watchSignup, watchLogout };
