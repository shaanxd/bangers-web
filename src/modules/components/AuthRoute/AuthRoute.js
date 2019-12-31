import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = props => {
  const { auth, component: Component, ...rest } = props;
  return auth ? <Component {...rest} /> : <Redirect to="/" />;
};

const mapStateToProps = state => ({
  auth: state.auth.authDetails
});

export default connect(mapStateToProps, null)(AuthRoute);
