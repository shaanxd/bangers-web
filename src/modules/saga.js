import { all } from 'redux-saga/effects';

import {
  watchLogin,
  watchSignup,
  watchLogout,
  watchCheckAuthState,
  watchCheckAuthTimeout
} from './sagas/auth';

function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchLogout(),
    watchCheckAuthState(),
    watchCheckAuthTimeout()
  ]);
}

export default rootSaga;
