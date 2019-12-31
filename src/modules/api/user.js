import { FDPOST, GET } from './core';

export const addDocument = (documentData, authToken) => {
  const endpoint = 'users/upload-document';
  return FDPOST(endpoint, documentData, authToken);
};

export const getUser = authToken => {
  const endpoint = 'users/user-profile';
  return GET(endpoint, authToken);
};

export const getDocuments = authToken => {
  const endpoint = 'users/user-documents';
  return GET(endpoint, authToken);
};
