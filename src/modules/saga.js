import { all } from 'redux-saga/effects';

import {
  watchLogin,
  watchSignup,
  watchLogout,
  watchCheckAuthState,
  watchCheckAuthTimeout,
  watchAuthGoogle
} from './sagas/auth';

function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchLogout(),
    watchCheckAuthState(),
    watchCheckAuthTimeout(),
    watchAuthGoogle()
  ]);
}

export default rootSaga;
