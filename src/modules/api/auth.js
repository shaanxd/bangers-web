import { POST } from './core';

export const postLogin = async (username, password) => {
  const endpoint = 'users/login';
  return POST(endpoint, { username, password });
};

export const postSignup = async userData => {
  const endpoint = 'users/signup';
  return POST(endpoint, { ...userData });
};
