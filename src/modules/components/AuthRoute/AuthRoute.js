import React from 'react';
import { Redirect } from 'react-router-dom';

const AuthRoute = props => {
  const { auth, component: Component, ...rest } = props;
  return auth ? <Component {...rest} /> : <Redirect to="/" />;
};

export default AuthRoute;
