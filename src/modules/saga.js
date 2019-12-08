import { all } from 'redux-saga/effects';

import { watchLogin, watchSignup } from './sagas/auth';

function* rootSaga() {
  yield all([watchLogin(), watchSignup()]);
}

export default rootSaga;
