import { GET } from './core';

export const getCarouselList = () => {
  const endpoint = 'vehicles?limit=6';
  return GET(endpoint);
};

export const getVehicle = vehicleID => {
  const endpoint = `vehicles/${vehicleID}`;
  return GET(endpoint);
};
