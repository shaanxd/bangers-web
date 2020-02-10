export const set = auth => {
  localStorage.setItem('auth', JSON.stringify(auth));
};

export const retrieve = () => {
  const auth = localStorage.getItem('auth');
  if (!auth || auth === '') {
    return null;
  }
  return JSON.parse(auth);
};

export const remove = () => {
  localStorage.removeItem('auth');
};
