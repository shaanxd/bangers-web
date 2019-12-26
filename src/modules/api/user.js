import { FDPOST } from './core';

export const addDocument = (documentData, authToken) => {
  const endpoint = 'users/upload-document';
  return FDPOST(endpoint, documentData, authToken);
};
