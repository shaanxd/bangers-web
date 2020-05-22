import { GET, POST } from './core';

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
