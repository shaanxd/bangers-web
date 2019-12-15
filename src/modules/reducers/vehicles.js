import createReducer from '../helper/createReducer';

import {
  GET_CAROUSEL,
  GET_CAROUSEL_SUCCESS,
  GET_CAROUSEL_FAILURE,
  GET_VEHICLE,
  GET_VEHICLE_SUCCESS,
  GET_VEHICLE_FAILURE
} from '../actions/vehicles';

export const initial_state = {
  carouselList: [],
  carouselListLoading: false,
  carouselListError: null,

  selectedVehicle: null,
  getVehicleLoading: false,
  getVehicleError: null
};

export const get_carousel = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    carouselListLoading: true,
    carouselListError: null
  };
};

export const get_carousel_success = (
  state = initial_state,
  { type, payload }
) => {
  return {
    ...state,
    carouselListLoading: false,
    carouselList: payload
  };
};

export const get_carousel_failure = (
  state = initial_state,
  { type, payload }
) => {
  return {
    ...state,
    carouselListLoading: false,
    carouselListError: payload
  };
};

export const get_vehicle = (state = initial_state, { type, payload }) => {
  return {
    ...state,
    selectedVehicle: null,
    getVehicleLoading: true,
    getVehicleError: null
  };
};

export const get_vehicle_success = (
  state = initial_state,
  { type, payload }
) => {
  return {
    ...state,
    selectedVehicle: payload,
    getVehicleLoading: false
  };
};

export const get_vehicle_failure = (
  state = initial_state,
  { type, payload }
) => {
  return {
    ...state,
    getVehicleLoading: false,
    getVehicleError: payload
  };
};

export const vehicleReducer = createReducer(initial_state, {
  [GET_CAROUSEL]: get_carousel,
  [GET_CAROUSEL_SUCCESS]: get_carousel_success,
  [GET_CAROUSEL_FAILURE]: get_carousel_failure,

  [GET_VEHICLE]: get_vehicle,
  [GET_VEHICLE_SUCCESS]: get_vehicle_success,
  [GET_VEHICLE_FAILURE]: get_vehicle_failure
});
