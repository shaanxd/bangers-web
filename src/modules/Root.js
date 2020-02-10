import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Login, Signup, Landing, Logout, AuthRedirect, Vehicle, Vehicles, Profile, AdminHome } from './screens';
import { checkAuthValid } from './actions/auth';
import { Toolbar, SideDrawer, Backdrop, AuthRoute, UnauthRoute } from './components';
import { USER_TYPES } from './constants/constants';

import styles from './Root.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Root = props => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const { auth } = props;

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(prevSideDrawerOpen => !prevSideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  useEffect(() => {
    props.checkAuthValid();
    // eslint-disable-next-line
  }, []);
  console.log(auth);
  return (
    <div className={styles.root}>
      <Router>
        <Toolbar drawerClickHandler={drawerToggleClickHandler} />
        <SideDrawer isOpen={sideDrawerOpen} />
        {sideDrawerOpen && <Backdrop onClick={backdropClickHandler} />}
        <main className={styles.main}>
          <Switch>
            <Route exact path="/">
              {auth && auth.userType === USER_TYPES.ADMIN ? <AdminHome /> : <Landing />}
            </Route>
            <Route exact path="/login">
              <UnauthRoute auth={auth} component={Login} />
            </Route>
            <Route exact path="/signup">
              <UnauthRoute auth={auth} component={Signup} />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
            <Route exact path="/authRedirect">
              <UnauthRoute auth={auth} component={AuthRedirect} />
            </Route>
            <Route exact path="/vehicles">
              <Vehicles />
            </Route>
            <Route exact path="/vehicles/:id">
              <Vehicle />
            </Route>
            <Route exact path="/profile">
              <AuthRoute auth={auth} component={Profile} />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
};

const mapStateToProps = ({ auth: { auth } }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthValid: () => {
      dispatch(checkAuthValid());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
