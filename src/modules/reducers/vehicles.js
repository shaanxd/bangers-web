import createReducer from '../helper/createReducer';

import {
  GET_CAROUSEL,
  GET_CAROUSEL_SUCCESS,
  GET_CAROUSEL_FAILURE
} from '../actions/vehicles';

export const initial_state = {
  carouselList: [],
  carouselListLoading: false,
  carouselListError: null
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

export const vehicleReducer = createReducer(initial_state, {
  [GET_CAROUSEL]: get_carousel,
  [GET_CAROUSEL_SUCCESS]: get_carousel_success,
  [GET_CAROUSEL_FAILURE]: get_carousel_failure
});
