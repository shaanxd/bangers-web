export const setAuthDetails = authDetails => {
  localStorage.setItem('authDetails', JSON.stringify(authDetails));
};

export const retrieveAuthDetails = () => {
  const authDetails = localStorage.getItem('authDetails');
  if (!authDetails || authDetails === '') {
    return null;
  }
  return JSON.parse(authDetails);
};

export const removeAuthDetails = () => {
  localStorage.removeItem('authDetails');
};
