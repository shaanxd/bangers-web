import React from 'react';
import { withRouter } from 'react-router-dom';

import './SideDrawer.css';
import { USER_TYPES } from '../../constants/constants';

const SideDrawer = (props) => {
  const { auth, isOpen } = props;

  let drawerStyles = isOpen ? 'side-drawer open' : 'side-drawer';

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

  const handleBookingClick = () => {
    props.history.push('/bookings');
  };

  const handleRatesClick = () => {
    props.history.push('/rate-comparisons');
  };

  const handleVehiclesClick = () => {
    props.history.push('/vehicles');
  };

  const handleEquipment = () => {
    props.history.push('/equipment');
  };

  const handleVehicleTypes = () => {
    props.history.push('/vehicle-types');
  };

  const handleCustomersClick = () => {
    props.history.push('/customers');
  };

  const renderUnauthRoutes = () => {
    return (
      <ul>
        <li>
          <span onClick={handleVehiclesClick}>Our Fleet</span>
        </li>
        <li>
          <span onClick={handleRatesClick}>Rates</span>
        </li>
        <li>
          <span onClick={handleLoginClick}>Login</span>
        </li>
        <li>
          <span onClick={handleSignupClick}>Signup</span>
        </li>
      </ul>
    );
  };

  const renderAuthRoutes = () => (
    <ul>
      <li>
        <span onClick={handleVehiclesClick}>Our Fleet</span>
      </li>
      <li>
        <span onClick={handleRatesClick}>Rates</span>
      </li>
      <li>
        <span onClick={handleProfileClick}>Profile</span>
      </li>
      <li>
        <span onClick={handleBookingClick}>Bookings</span>
      </li>
      <li>
        <span onClick={handleLogoutClick}>Logout</span>
      </li>
    </ul>
  );

  const renderAdminRoutes = () => (
    <ul>
      <li>
        <span onClick={handleCustomersClick}>Customers</span>
      </li>
      <li>
        <span onClick={handleVehiclesClick}>Our Fleet</span>
      </li>
      <li>
        <span onClick={handleVehicleTypes}>Types</span>
      </li>
      <li>
        <span onClick={handleEquipment}>Equipment</span>
      </li>
      <li>
        <span onClick={handleRatesClick}>Rates</span>\
      </li>
      <li>
        <span onClick={handleLogoutClick}>Logout</span>
      </li>
    </ul>
  );

  const navigationRoutes = !auth
    ? renderUnauthRoutes()
    : auth.userType === USER_TYPES.ADMIN
    ? renderAdminRoutes()
    : renderAuthRoutes();
  return <nav className={drawerStyles}>{navigationRoutes}</nav>;
};

export default withRouter(SideDrawer);
