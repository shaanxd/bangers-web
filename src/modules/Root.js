import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { Login, Signup, Landing, AuthRedirect, Vehicle, Vehicles, Profile, AdminHome } from './screens';
import { checkAuthValid } from './actions/auth';
import { Toolbar, SideDrawer, Backdrop, AuthRoute, UnauthRoute, Loading } from './components';
import { USER_TYPES } from './constants/constants';
import { logoutUser } from './actions/auth';

import styles from './Root.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Root = props => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const { auth, checkAuthLoading, logoutLoading, logout } = props;

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

  const renderLoading = text => {
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

const mapStateToProps = ({ auth: { auth, checkAuthLoading, logoutLoading } }) => {
  return { auth, checkAuthLoading, logoutLoading };
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthValid: () => {
      dispatch(checkAuthValid());
    },
    logout: () => {
      dispatch(logoutUser());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);
