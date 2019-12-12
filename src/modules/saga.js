import { all } from 'redux-saga/effects';

import {
  watchLogin,
  watchSignup,
  watchLogout,
  watchCheckAuthState,
  watchCheckAuthTimeout,
  watchAuthRedirect
} from './sagas/auth';

function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchLogout(),
    watchCheckAuthState(),
    watchCheckAuthTimeout(),
    watchAuthRedirect()
  ]);
}

export default rootSaga;
