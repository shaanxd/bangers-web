import { POST } from './core';

export const postLogin = (username, password) => {
  const endpoint = 'auth/login';
  return POST(endpoint, { username, password });
};

export const postSignup = userData => {
  const endpoint = 'auth/signup';
  return POST(endpoint, { ...userData });
};
