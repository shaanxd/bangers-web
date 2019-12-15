import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  Login,
  Signup,
  Landing,
  Logout,
  AuthRedirect,
  Vehicle,
  Vehicles
} from './screens';
import { connect } from 'react-redux';
import { check_auth_state } from './actions/auth';
import { Toolbar, SideDrawer, Backdrop } from './components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
        <Toolbar drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer isOpen={sideDrawerOpen} />
        {sideDrawerOpen && <Backdrop onClick={backdropClickHandler} />}
        <main
          style={{
            height: '100%',
            paddingTop: '60px',
            boxSizing: 'border-box'
          }}
        >
          <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
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
          </Switch>
        </main>
      </Router>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthState: () => {
      dispatch(check_auth_state());
    }
  };
};

export default connect(null, mapDispatchToProps)(RootScreen);
