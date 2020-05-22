import { GET, POST } from './core';

export const getCarouselList = () => {
  const endpoint = 'vehicles?limit=6';
  return GET(endpoint);
};

export const getVehicle = (vehicleID) => {
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

export const getVehicleList = (typeId) => {
  const endpoint = typeId ? `vehicles?type=${typeId}` : 'vehicles';
  return GET(endpoint);
};

export const getVehicleTypes = () => {
  const endpoint = 'vehicles/vehicle-types';
  return GET(endpoint);
};

export const extendBooking = (bookingData, authToken) => {
  const endpoint = 'bookings/extend-booking';
  return POST(endpoint, bookingData, authToken);
};

export const getRates = () => {
  const endpoint = 'vehicles/vehicle-comparisons';
  return GET(endpoint);
};

export const addAdditionalEquipment = (equipmentData, authToken) => {
  const endpoint = 'bookings/add-equipment';
  return POST(endpoint, equipmentData, authToken);
};
