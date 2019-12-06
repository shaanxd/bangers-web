import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Landing } from './home/screens';
import { Login, Signup } from './auth/screens';
import { retrieveAuthDetails } from './helper/localStorage';
import { connect } from 'react-redux';
import { login_successful } from './auth/actions/auth';

const RootScreen = props => {
  const loadFromUserToken = () => {
    let authDetails = retrieveAuthDetails();
    if (authDetails) {
      props.setAuthDetails(JSON.parse(authDetails));
    }
  };
  useEffect(() => {
    loadFromUserToken();
  }, []);
  return (
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
