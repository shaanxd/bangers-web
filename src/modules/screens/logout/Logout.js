import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logout } from '../../actions/auth';

const LogoutScreen = props => {
  useEffect(() => {
    props.logoutUser();
    props.history.replace('/');
  });
  return <h1>Logout</h1>;
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
