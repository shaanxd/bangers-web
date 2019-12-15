export const get_carousel = payload => {
  return {
    type: GET_CAROUSEL,
    payload
  };
};

export const get_carousel_success = payload => {
  return {
    type: GET_CAROUSEL_SUCCESS,
    payload
  };
};

export const get_carousel_failure = payload => {
  return {
    type: GET_CAROUSEL_FAILURE,
    payload
  };
};

export const get_vehicle = payload => {
  return {
    type: GET_VEHICLE,
    payload
  };
};

export const get_vehicle_success = payload => {
  return {
    type: GET_VEHICLE_SUCCESS,
    payload
  };
};

export const get_vehicle_failure = payload => {
  return {
    type: GET_VEHICLE_FAILURE,
    payload
  };
};

export const GET_CAROUSEL = 'GET_CAROUSEL';
export const GET_CAROUSEL_SUCCESS = 'GET_CAROUSEL_SUCCESS';
export const GET_CAROUSEL_FAILURE = 'GET_CAROUSEL_FAILURE';

export const GET_VEHICLE = 'GET_VEHICLE';
export const GET_VEHICLE_SUCCESS = 'GET_VEHICLE_SUCCESS';
export const GET_VEHICLE_FAILURE = 'GET_VEHICLE_FAILURE';
