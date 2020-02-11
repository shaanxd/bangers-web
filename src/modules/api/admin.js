import { GET, POST } from './core';

export const getBookings = authToken => {
  const endpoint = `admin/get-bookings`;
  return GET(endpoint, authToken);
};

export const updateBooking = (bookingData, authToken) => {
  const endpoint = 'admin/update-booking';
  return POST(endpoint, bookingData, authToken);
};
