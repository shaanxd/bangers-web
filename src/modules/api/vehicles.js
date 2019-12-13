import { GET } from './core';

export const getCarouselList = () => {
  const endpoint = 'vehicles?limit=6';
  return GET(endpoint);
};
