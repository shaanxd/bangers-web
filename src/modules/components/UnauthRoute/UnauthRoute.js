import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UnauthRoute = props => {
  const { auth, component: Component, ...rest } = props;
  return auth ? <Redirect to="/" /> : <Component {...rest} />;
};

const mapStateToProps = state => ({
  auth: state.auth.authDetails
});

export default connect(mapStateToProps, null)(UnauthRoute);
