import { takeEvery, put, call, delay } from 'redux-saga/effects';
import {
  setAuthDetails,
  removeAuthDetails,
  retrieveAuthDetails
} from '../helper/localStorage';

import {
  LOGIN,
  login_successful,
  login_failure,
  signup_successful,
  SIGNUP,
  signup_failure,
  logout_failure,
  logout_success,
  LOGOUT,
  CHECK_AUTH_STATE,
  CHECK_AUTH_TIMEOUT,
  logout,
  check_auth_timeout
} from '../actions/auth';

import { postLogin, postSignup } from '../api/auth';

function* handleLoginSaga({ type, payload: { username, password } }) {
  try {
    const response = yield call(postLogin, username, password);
    const expirationDate = yield new Date(
      new Date().getTime() + response.expiresInSeconds * 1000
    );
    response.authToken && setAuthDetails({ ...response, expirationDate });
    yield put(login_successful(response));
    yield put(check_auth_timeout(response.expiresInSeconds));
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

function* handleCheckAuthState({ type, payload }) {
  const token = yield retrieveAuthDetails();
  if (!token) {
    yield put(logout());
  } else {
    const expirationDate = yield new Date(token.expirationDate);
    if (expirationDate <= new Date()) {
      yield put(logout());
    } else {
      console.log(token);
      yield put(
        login_successful({
          authToken: token.authToken,
          expiresInSeconds: token.expiresInSeconds
        })
      );
      yield put(
        check_auth_timeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
}

function* handleCheckAuthTimeout({ type, payload }) {
  yield delay(payload);
  yield put(logout());
}

function* watchLogin() {
  yield takeEvery(LOGIN, handleLoginSaga);
}

function* watchSignup() {
  yield takeEvery(SIGNUP, handleSignupSaga);
}

function* watchLogout() {
  yield takeEvery(LOGOUT, handleLogoutSaga);
}

function* watchCheckAuthState() {
  yield takeEvery(CHECK_AUTH_STATE, handleCheckAuthState);
}

function* watchCheckAuthTimeout() {
  yield takeEvery(CHECK_AUTH_TIMEOUT, handleCheckAuthTimeout);
}

export {
  watchLogin,
  watchSignup,
  watchLogout,
  watchCheckAuthState,
  watchCheckAuthTimeout
};
