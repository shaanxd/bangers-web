import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Login,
  Signup,
  Landing,
  AuthRedirect,
  Vehicle,
  Vehicles,
  Profile,
  Bookings,
  Comparison,
  Equipment,
  VehicleType,
  Customers,
  AddVehicle,
} from './screens';
import { checkAuthValid } from './actions/auth';
import { Toolbar, SideDrawer, Backdrop, AuthRoute, UnauthRoute, Loading } from './components';
import { logoutUser } from './actions/auth';

import styles from './Root.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { USER_TYPES } from './constants/constants';

const Root = (props) => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const { auth, checkAuthLoading, logoutLoading, logout } = props;

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen((prevSideDrawerOpen) => !prevSideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  useEffect(() => {
    props.checkAuthValid();
    // eslint-disable-next-line
  }, []);

  const renderLoading = (text) => {
    return <Loading text={text} />;
  };

  return checkAuthLoading ? (
    renderLoading('Loading')
  ) : logoutLoading ? (
    renderLoading('Logging out')
  ) : (
    <div className={styles.root}>
      <Router>
        <Toolbar drawerClickHandler={drawerToggleClickHandler} auth={auth} onLogoutClick={logout} />
        <SideDrawer isOpen={sideDrawerOpen} auth={auth} onLogoutClick={logout} />
        {sideDrawerOpen && <Backdrop onClick={backdropClickHandler} />}
        <main className={styles.main}>
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/login">
              <UnauthRoute auth={auth} component={Login} />
            </Route>
            <Route exact path="/signup">
              <UnauthRoute auth={auth} component={Signup} />
            </Route>
            <Route exact path="/authRedirect">
              <UnauthRoute auth={auth} component={AuthRedirect} />
            </Route>
            <Route exact path="/rate-comparisons">
              <Comparison />
            </Route>
            <Route exact path="/vehicles">
              <Vehicles />
            </Route>
            <Route exact path="/vehicles/:id">
              <Vehicle />
            </Route>
            <Route exact path="/profile">
              <AuthRoute auth={auth} component={Profile} user={USER_TYPES.CUSTOMER} />
            </Route>
            <Route exact path="/bookings">
              <AuthRoute auth={auth} component={Bookings} user={USER_TYPES.CUSTOMER} />
            </Route>
            <Route exact path="/equipment">
              <AuthRoute auth={auth} component={Equipment} user={USER_TYPES.ADMIN} />
            </Route>
            <Route exact path="/vehicle-types">
              <AuthRoute auth={auth} component={VehicleType} user={USER_TYPES.ADMIN} />
            </Route>
            <Route exact path="/customers">
              <AuthRoute auth={auth} component={Customers} user={USER_TYPES.ADMIN} />
            </Route>
            <Route exact path="/add-vehicle">
              <AuthRoute auth={auth} component={AddVehicle} user={USER_TYPES.ADMIN} />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

const mapStateToProps = ({ auth: { auth, checkAuthLoading, logoutLoading } }) => {
  return { auth, checkAuthLoading, logoutLoading };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkAuthValid: () => {
      dispatch(checkAuthValid());
    },
    logout: () => {
      dispatch(logoutUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
