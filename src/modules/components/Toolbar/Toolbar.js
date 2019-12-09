import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { DrawerToggleButton } from '../';

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
        <a className={'toolbar__navigation-link'} href="/logout">
          Logout
        </a>
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
          <a href="/">Bangers</a>
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
