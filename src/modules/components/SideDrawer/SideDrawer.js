import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './SideDrawer.css';

const SideDrawer = props => {
  let drawerStyles = props.isOpen ? 'side-drawer open' : 'side-drawer';
  const { authDetails } = props.auth;
  const renderUnauthRoutes = () => (
    <ul>
      <li>
        <a href="/login">Login</a>
      </li>
      <li>
        <a href="/signup">Signup</a>
      </li>
    </ul>
  );
  const renderAuthRoutes = () => (
    <ul>
      <li>
        <a href="/logout">Logout</a>
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
