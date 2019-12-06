/* FUNCTION TO ADD AUTH TOKEN TO LOCAL STORAGE */
export const setAuthDetails = authDetails => {
  localStorage.setItem('authDetails', JSON.stringify(authDetails));
};

/* FUNCTION TO RETRIEVE AUTH TOKEN TO LOCAL STORAGE */
export const retrieveAuthDetails = () => {
  const authDetails = localStorage.getItem('authDetails');
  if (!authDetails || authDetails === '') {
    return null;
  }
  return authDetails;
};
