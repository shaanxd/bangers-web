import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { USER_TYPES } from '../../constants/constants';
import { AdminHome, UserHome } from '..';

const LandingScreen = props => {
  const { auth } = props;
  const Component = auth && auth.userType === USER_TYPES.ADMIN ? AdminHome : UserHome;
  return <Component />;
};

const mapStateToProps = ({ auth: { auth } }) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LandingScreen));
