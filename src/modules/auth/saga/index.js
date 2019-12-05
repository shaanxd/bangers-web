import { takeEvery, put, call } from 'redux-saga/effects';

import { LOGIN, login_successful, login_failure } from '../actions/auth';

/* METHOD TO MAKE REQUEST TO LOGIN
TO DO MOVE BASEURL TO ENV AND MODE THIS TO SEPARATE MODULE */
const login_request = async (username, password) => {
  const url = `http://localhost:8000/api/users/login`;
  const response = await api_post(url, { username, password });
  return response;
};

/* METHOD TO MAKE POST REQUESTS
TO DO MOVE THIS TO A SEPARATE MODULE */
const api_post = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (response.status >= 400) {
    throw new Error(data.message);
  }
  return data;
};

/* function executed by the watcher saga when login is dispatched */
function* handleLoginSaga({ type, payload: { username, password } }) {
  try {
    const response = yield call(login_request, username, password);
    yield put(login_successful(response.userToken));
  } catch (err) {
    yield put(login_failure(err.message));
  }
}

/* 
Watches LOGIN action dispatches. Is imported in root saga.js
file and yielded in array along with other sagas to make root
saga which is then run in the configureStore function in store.js
*/
function* watchLogin() {
  yield takeEvery(LOGIN, handleLoginSaga);
}

export default watchLogin;
