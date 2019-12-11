import { takeEvery, put, call, delay } from 'redux-saga/effects';
import Moment from 'moment';
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
  check_auth_timeout,
  AUTH_GOOGLE
} from '../actions/auth';

import { postLogin, postSignup, postGoogleAuth } from '../api/auth';

function* handleLoginSaga({ type, payload: { username, password } }) {
  try {
    const response = yield call(postLogin, username, password);
    const expirationDate = Moment()
      .add(response.expiresInSeconds, 's')
      .format();
    yield setAuthDetails({ ...response, expirationDate });
    yield put(login_successful(response));
    yield put(check_auth_timeout(response.expiresInSeconds * 1000));
  } catch (err) {
    yield put(login_failure(err.message));
  }
}

function* handleSignupSaga({ type, payload }) {
  try {
    const response = yield call(postSignup, payload);
    const expirationDate = Moment()
      .add(response.expiresInSeconds, 's')
      .format();
    yield setAuthDetails({ ...response, expirationDate });
    yield put(signup_successful(response));
    yield put(check_auth_timeout(response.expiresInSeconds * 1000));
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
    const expirationDate = yield Moment(token.expirationDate);
    const currentMoment = yield Moment();
    if (expirationDate.isBefore(currentMoment)) {
      yield put(logout());
    } else {
      const { authToken, expiresInSeconds, userType } = token;
      yield put(
        login_successful({
          authToken,
          expiresInSeconds,
          userType
        })
      );
      yield put(check_auth_timeout(expirationDate.diff(currentMoment, 'ms')));
    }
  }
}

function* handleCheckAuthTimeout({ type, payload }) {
  yield delay(payload);
  yield put(logout());
}

function* handleAuthGoogle({ type, payload: { accessToken, origin } }) {
  try {
    const response = yield call(postGoogleAuth, accessToken);
    const expirationDate = Moment()
      .add(response.expiresInSeconds, 's')
      .format();
    yield setAuthDetails({ ...response, expirationDate });
    if (origin === 'SIGNUP') {
      yield put(signup_successful(response));
    } else {
      yield put(login_successful(response));
    }
    yield put(check_auth_timeout(response.expiresInSeconds * 1000));
  } catch (err) {
    if (origin === 'SIGNUP') {
      yield put(signup_failure(err.message));
    } else {
      yield put(login_failure(err.message));
    }
  }
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

function* watchAuthGoogle() {
  yield takeEvery(AUTH_GOOGLE, handleAuthGoogle);
}

export {
  watchLogin,
  watchSignup,
  watchLogout,
  watchCheckAuthState,
  watchCheckAuthTimeout,
  watchAuthGoogle
};
