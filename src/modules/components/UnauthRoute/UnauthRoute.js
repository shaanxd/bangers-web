import React from 'react';
import { Redirect } from 'react-router-dom';

const UnauthRoute = props => {
  const { auth, component: Component, ...rest } = props;
  return auth ? <Redirect to="/" /> : <Component {...rest} />;
};

export default UnauthRoute;
