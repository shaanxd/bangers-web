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
