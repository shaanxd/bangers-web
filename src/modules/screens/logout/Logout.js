import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { logout } from '../../actions/auth';

const LogoutScreen = props => {
  useEffect(() => {
    props.logoutUser();
  });
  return <Redirect to="/"></Redirect>;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => {
      dispatch(logout());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LogoutScreen)
);
