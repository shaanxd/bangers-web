import { all } from 'redux-saga/effects';

import {
  watchLogin,
  watchSignup,
  watchLogout,
  watchCheckAuthState,
  watchCheckAuthTimeout,
  watchAuthRedirect
} from './sagas/auth';
import { watchVehicleSaga } from './sagas/vehicles';

function* rootSaga() {
  yield all([
    watchLogin(),
    watchSignup(),
    watchLogout(),
    watchCheckAuthState(),
    watchCheckAuthTimeout(),
    watchAuthRedirect(),
    watchVehicleSaga()
  ]);
}

export default rootSaga;
