import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { DrawerToggleButton, Icomoon } from '../';

import './Toolbar.css';

const Toolbar = props => {
  const { authDetails } = props.auth;

  const handleProfileClick = () => {
    props.history.push('/profile');
  };

  const handleLoginClick = () => {
    props.history.push('/login');
  };

  const handleSignupClick = () => {
    props.history.push('/signup');
  };

  const handleLogoutClick = () => {
    props.history.push('/logout');
  };

  const handleHomeClick = () => {
    props.history.push('/');
  };

  const handleBookingClick = () => {
    props.history.push('/bookings');
  };

  const renderUnauthRoutes = () => {
    return (
      <ul>
        <li>
          <span
            className={
              props.location.pathname === '/login'
                ? 'toolbar__navigation-link active'
                : 'toolbar__navigation-link'
            }
            onClick={handleLoginClick}
          >
            Login
          </span>
        </li>
        <li>
          <span
            className={
              props.location.pathname === '/signup'
                ? 'toolbar__navigation-link active'
                : 'toolbar__navigation-link'
            }
            onClick={handleSignupClick}
          >
            Signup
          </span>
        </li>
      </ul>
    );
  };

  const renderAuthRoutes = () => (
    <ul>
      <li>
        <div className="toolbar__navigation-div">
          <div className="toolbar__navigation-display-div">
            <Icomoon icon="user" color="#FFFFFF" size={20} />
            <label className="toolbar__navigation-profile-label">Profile</label>
          </div>
          <div className="toolbar__navigation-dropdown">
            <span
              className="toolbar__navigation-dropdown-item"
              onClick={handleProfileClick}
            >
              Profile
            </span>

            <span
              className="toolbar__navigation-dropdown-item"
              onClick={handleBookingClick}
            >
              Bookings
            </span>
            <span
              className="toolbar__navigation-dropdown-item"
              onClick={handleLogoutClick}
            >
              Logout
            </span>
          </div>
        </div>
      </li>
    </ul>
  );

  const navigationRoutes = authDetails
    ? renderAuthRoutes()
    : renderUnauthRoutes();
  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton onClick={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          <span onClick={handleHomeClick}>
            <span className="toolbar__logo-light">BANGERS</span>
            <span className="toolbar__logo-dark">RENTALS</span>
          </span>
        </div>
        <div className="spacer" />
        <div className="toolbar__navigation-items">{navigationRoutes}</div>
      </nav>
    </header>
  );
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
  connect(mapStateToProps, mapDispatchToProps)(Toolbar)
);
