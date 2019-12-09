import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, Signup, Landing } from './screens';
import { retrieveAuthDetails } from './helper/localStorage';
import { connect } from 'react-redux';
import { login_successful } from './actions/auth';
import { Toolbar, SideDrawer, Backdrop } from './components';

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
          </Switch>
        </main>
      </Router>
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
