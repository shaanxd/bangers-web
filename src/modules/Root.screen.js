import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, Signup, Landing, Logout, AuthRedirect, Vehicle, Vehicles, Profile } from './screens';
import { connect } from 'react-redux';
import { check_auth_state } from './actions/auth';
import { Toolbar, SideDrawer, Backdrop, AuthRoute, UnauthRoute } from './components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { USER_TYPES } from './constants/constants';

const RootScreen = props => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(prevSideDrawerOpen => !prevSideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  useEffect(() => {
    props.checkAuthState();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <Router>
        {props.authDetails && props.authDetails.userType === USER_TYPES.ADMIN ? null : (
          <Toolbar drawerClickHandler={drawerToggleClickHandler} />
        )}
        <SideDrawer isOpen={sideDrawerOpen} />
        {sideDrawerOpen && <Backdrop onClick={backdropClickHandler} />}
        <main
          style={{
            height: '100%'
          }}
        >
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/login">
              <UnauthRoute component={Login} />
            </Route>
            <Route exact path="/signup">
              <UnauthRoute component={Signup} />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/authRedirect">
              <AuthRedirect />
            </Route>
            <Route exact path="/vehicles">
              <Vehicles />
            </Route>
            <Route exact path="/vehicles/:id">
              <Vehicle />
            </Route>
            <Route exact path="/profile">
              <AuthRoute component={Profile} />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

const mapStateToProps = ({ auth: { authDetails } }) => {
  return { authDetails };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => {
      dispatch(check_auth_state());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen);
