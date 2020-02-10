import { all } from 'redux-saga/effects';

import watchAuthSaga from './sagas/auth';

function* rootSaga() {
  yield all([watchAuthSaga()]);
}

export default rootSaga;
