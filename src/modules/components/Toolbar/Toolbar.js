import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { DrawerToggleButton, Icomoon } from '../';

import './Toolbar.css';

const Toolbar = props => {
  const { authDetails } = props.auth;
  const renderUnauthRoutes = () => {
    return (
      <ul>
        <li>
          <a
            className={
              props.location.pathname === '/login'
                ? 'toolbar__navigation-link active'
                : 'toolbar__navigation-link'
            }
            href="/login"
          >
            Login
          </a>
        </li>
        <li>
          <a
            className={
              props.location.pathname === '/signup'
                ? 'toolbar__navigation-link active'
                : 'toolbar__navigation-link'
            }
            href="/signup"
          >
            Signup
          </a>
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
            <div className="toolbar__navigation-profile">
              <img
                src="https://freeiconshop.com/wp-content/uploads/edd/person-flat-128x128.png"
                alt="Profile"
                className="toolbar__navigation-profile-img"
              />
              <div className="toolbar__navigation-profile-div">
                <label className="profile__name-label">Shahid Hassan</label>
                <a type="button" className="profile__edit-btn">
                  Edit Profile
                </a>
              </div>
            </div>
            <a className="toolbar__navigation-dropdown-item" href="/logout">
              Logout
            </a>
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
          <a href="/">
            <span className="toolbar__logo-light">BANGERS</span>
            <span className="toolbar__logo-dark">RENTALS</span>
          </a>
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
