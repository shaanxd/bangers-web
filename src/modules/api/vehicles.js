import { GET, POST } from './core';

export const getCarouselList = () => {
  const endpoint = 'vehicles?limit=6';
  return GET(endpoint);
};

export const getVehicle = vehicleID => {
  const endpoint = `vehicles/${vehicleID}`;
  return GET(endpoint);
};

export const createBooking = (bookingDetails, authToken) => {
  const endpoint = 'bookings/create-booking';
  return POST(endpoint, { ...bookingDetails }, authToken);
};

export const getEquipment = () => {
  const endpoint = 'bookings/equipment';
  return GET(endpoint);
};

export const getVehicleList = typeId => {
  const endpoint = typeId ? `vehicles?type=${typeId}` : 'vehicles';
  return GET(endpoint);
};

export const getVehicleTypes = () => {
  const endpoint = 'vehicles/vehicle-types';
  return GET(endpoint);
};
