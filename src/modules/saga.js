import { all } from 'redux-saga/effects';

import { watchLogin, watchSignup } from './auth/saga';

function* rootSaga() {
  yield all([watchLogin(), watchSignup()]);
}

export default rootSaga;
