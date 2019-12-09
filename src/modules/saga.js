import { all } from 'redux-saga/effects';

import { watchLogin, watchSignup, watchLogout } from './sagas/auth';

function* rootSaga() {
  yield all([watchLogin(), watchSignup(), watchLogout()]);
}

export default rootSaga;
