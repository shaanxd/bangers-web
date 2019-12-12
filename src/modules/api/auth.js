import { POST } from './core';

export const postLogin = async (username, password) => {
  const endpoint = 'auth/login';
  return POST(endpoint, { username, password });
};

export const postSignup = async userData => {
  const endpoint = 'auth/signup';
  return POST(endpoint, { ...userData });
};
