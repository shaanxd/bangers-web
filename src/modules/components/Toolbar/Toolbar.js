import React from 'react';
import { withRouter } from 'react-router-dom';
import { AiOutlineUser, AiOutlineExport, AiOutlineMail } from 'react-icons/ai';

import { DrawerToggleButton } from '../';
import { USER_TYPES } from '../../constants/constants';

import './Toolbar.css';

const Toolbar = props => {
  const { auth } = props;

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
    props.onLogoutClick();
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
              props.location.pathname === '/login' ? 'toolbar__navigation-link active' : 'toolbar__navigation-link'
            }
            onClick={handleLoginClick}
          >
            Login
          </span>
        </li>
        <li>
          <span
            className={
              props.location.pathname === '/signup' ? 'toolbar__navigation-link active' : 'toolbar__navigation-link'
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
        <span className="toolbar__navigation-link" onClick={handleProfileClick}>
          <AiOutlineUser size={20} />
          <span>Profile</span>
        </span>
        <span className="toolbar__navigation-link" onClick={handleBookingClick}>
          <AiOutlineMail size={20} />
          <span>Bookings</span>
        </span>
        <span className="toolbar__navigation-link" onClick={handleLogoutClick}>
          <AiOutlineExport size={20} />
          <span>Logout</span>
        </span>
      </li>
    </ul>
  );

  const renderAdminRoutes = () => (
    <ul>
      <li>
        <span className={'toolbar__navigation-link'} onClick={handleLogoutClick}>
          Logout
        </span>
      </li>
    </ul>
  );

  const navigationRoutes = !auth
    ? renderUnauthRoutes()
    : auth.userType === USER_TYPES.ADMIN
    ? renderAdminRoutes()
    : renderAuthRoutes();
  return (
    <header className="toolbar">
      <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
          <DrawerToggleButton onClick={props.drawerClickHandler} />
        </div>
        <div className="toolbar__logo">
          <span onClick={handleHomeClick}>
            <span className="toolbar__logo-light">BANG</span>
            <span className="toolbar__logo-dark">ERS</span>
          </span>
        </div>
        <div className="spacer" />
        <div className="toolbar__navigation-items">{navigationRoutes}</div>
      </nav>
    </header>
  );
};

export default withRouter(Toolbar);
