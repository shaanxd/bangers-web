import { GET, POST, FDPOST } from './core';

export const getBookings = (authToken) => {
  const endpoint = `admin/get-bookings`;
  return GET(endpoint, authToken);
};

export const updateBooking = (bookingData, authToken) => {
  const endpoint = 'admin/update-booking';
  return POST(endpoint, bookingData, authToken);
};

export const addEquipment = (equipmentData, authToken) => {
  const endpoint = 'admin/add-equipment';
  return POST(endpoint, equipmentData, authToken);
};

export const getUsers = (authToken) => {
  const endpoint = 'admin/get-users';
  return GET(endpoint, authToken);
};

export const addVehicleType = (typeData, authToken) => {
  const endpoint = 'admin/add-vehicle-type';
  return POST(endpoint, typeData, authToken);
};

export const enableUser = (id, authToken) => {
  const endpoint = `admin/enable-user/${id}`;
  return POST(endpoint, {}, authToken);
};

export const disableUser = (id, authToken) => {
  const endpoint = `admin/disable-user/${id}`;
  return POST(endpoint, {}, authToken);
};

export const addVehicle = (vehicleData, authToken) => {
  const endpoint = 'admin/add-vehicle';
  return FDPOST(endpoint, vehicleData, authToken);
};
