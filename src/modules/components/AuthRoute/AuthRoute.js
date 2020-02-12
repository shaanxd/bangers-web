import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthRoute = props => {
  const { auth, component: Component, user, ...rest } = props;
  return auth && auth.userType === user ? <Component {...rest} /> : <Redirect to="/" />;
};

export default AuthRoute;
