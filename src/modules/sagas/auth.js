import { takeEvery, all, delay, put } from 'redux-saga/effects';
import Moment from 'moment';

import {
  AUTH_SUCCESS,
  CHECK_AUTH_TIMEOUT,
  checkAuthTimeout,
  CHECK_AUTH_VALID,
  checkAuthValidSuccess,
  LOGOUT_USER,
  logoutSuccess,
  logoutUser
} from '../actions/auth';
import { set, retrieve, remove } from '../helper/localStorage';

function* handleAuthSuccess({ type, payload }) {
  if (payload) {
    const expiresIn = payload.expiresInSeconds;
    const expirationDate = Moment()
      .add(expiresIn, 's')
      .format();
    yield set({ ...payload, expirationDate });
    yield put(checkAuthTimeout(expiresIn * 1000));
  }
}

function* handleCheckAuthTimeout({ type, payload }) {
  yield delay(payload);
  yield put(logoutUser());
}

function* handleCheckAuthValid() {
  const token = yield retrieve();
  let userData = null;
  if (token) {
    const { expirationDate, ...rest } = token;
    const expirationMoment = yield Moment(expirationDate);
    const currentMoment = yield Moment();
    if (expirationMoment.isBefore(currentMoment)) {
      yield remove();
    } else {
      userData = { ...rest };
      yield put(checkAuthTimeout(expirationMoment.diff(currentMoment, 'ms')));
    }
  }
  yield put(checkAuthValidSuccess(userData));
}

function* handleLogout() {
  yield remove();
  yield delay(1000);
  yield put(logoutSuccess());
}

function* watchAuthSaga() {
  yield all([
    takeEvery(AUTH_SUCCESS, handleAuthSuccess),
    takeEvery(CHECK_AUTH_TIMEOUT, handleCheckAuthTimeout),
    takeEvery(CHECK_AUTH_VALID, handleCheckAuthValid),
    takeEvery(LOGOUT_USER, handleLogout)
  ]);
}

export default watchAuthSaga;
