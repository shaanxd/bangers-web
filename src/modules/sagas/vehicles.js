import { takeEvery, call, put } from 'redux-saga/effects';
import {
  GET_CAROUSEL,
  get_carousel_success,
  get_carousel_failure
} from '../actions/vehicles';
import { getCarouselList } from '../api/vehicles';

function* handleGetCarousel({ type, payload }) {
  try {
    const response = yield call(getCarouselList);
    yield put(get_carousel_success(response));
  } catch (err) {
    yield put(get_carousel_failure(err.message));
  }
}

function* watchVehicleSaga() {
  yield takeEvery(GET_CAROUSEL, handleGetCarousel);
}

export { watchVehicleSaga };
