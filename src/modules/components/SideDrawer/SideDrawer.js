import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './SideDrawer.css';

const SideDrawer = props => {
  let drawerStyles = props.isOpen ? 'side-drawer open' : 'side-drawer';
  const { authDetails } = props.auth;

  const handleLoginClick = () => {
    props.history.push('/login');
  };

  const handleSignupClick = () => {
    props.history.push('/signup');
  };

  const handleLogoutClick = () => {
    props.history.push('/logout');
  };

  const renderUnauthRoutes = () => (
    <ul>
      <li>
        <span onClick={handleLoginClick}>Login</span>
      </li>
      <li>
        <span onClick={handleSignupClick}>Signup</span>
      </li>
    </ul>
  );
  const renderAuthRoutes = () => (
    <ul>
      <li>
        <span onClick={handleLogoutClick}>Logout</span>
      </li>
    </ul>
  );

  const navigationRoutes = authDetails
    ? renderAuthRoutes()
    : renderUnauthRoutes();
  return <nav className={drawerStyles}>{navigationRoutes}</nav>;
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideDrawer)
);
