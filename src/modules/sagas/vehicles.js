import { takeEvery, call, put, all } from 'redux-saga/effects';
import {
  GET_CAROUSEL,
  get_carousel_success,
  get_carousel_failure,
  get_vehicle_success,
  GET_VEHICLE,
  get_vehicle_failure
} from '../actions/vehicles';
import { getCarouselList, getVehicle } from '../api/vehicles';

function* handleGetCarousel({ type, payload }) {
  try {
    const response = yield call(getCarouselList);
    yield put(get_carousel_success(response));
  } catch (err) {
    yield put(get_carousel_failure(err.message));
  }
}

function* handleGetVehicle({ type, payload: vehicleID }) {
  try {
    const response = yield call(getVehicle, vehicleID);
    yield put(get_vehicle_success(response));
  } catch (err) {
    yield put(get_vehicle_failure(err.message));
  }
}

function* watchVehicleSaga() {
  yield all([
    takeEvery(GET_CAROUSEL, handleGetCarousel),
    takeEvery(GET_VEHICLE, handleGetVehicle)
  ]);
}

export { watchVehicleSaga };
