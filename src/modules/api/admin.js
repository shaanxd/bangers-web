import { GET } from './core';

export const getBookings = authToken => {
  const endpoint = `admin/get-bookings`;
  return GET(endpoint, authToken);
};
