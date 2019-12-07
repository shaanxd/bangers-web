import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Landing } from './home/screens';
import { Login, Signup } from './auth/screens';
import { retrieveAuthDetails } from './helper/localStorage';
import { connect } from 'react-redux';
import { login_successful } from './auth/actions/auth';
import Toolbar from './shared/components/Toolbar/Toolbar';
import SideDrawer from './shared/components/SideDrawer/SideDrawer';
import Backdrop from './shared/components/Backdrop/Backdrop';

const RootScreen = props => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const loadFromUserToken = () => {
    let authDetails = retrieveAuthDetails();
    if (authDetails) {
      props.setAuthDetails(JSON.parse(authDetails));
    }
  };

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(prevSideDrawerOpen => !prevSideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  useEffect(() => {
    loadFromUserToken();
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <Toolbar drawerClickHandler={drawerToggleClickHandler} />
      <SideDrawer isOpen={sideDrawerOpen} />
      {sideDrawerOpen && <Backdrop onClick={backdropClickHandler} />}
      <main style={{ marginTop: '60px' }}>
        <Router>
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
          </Switch>
        </Router>
      </main>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setAuthDetails: authDetails => {
      dispatch(login_successful(authDetails));
    }
  };
};

export default connect(null, mapDispatchToProps)(RootScreen);
