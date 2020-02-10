import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import styles from './Landing.module.css';

const LandingScreen = props => {
  return <div className={styles.main__div}></div>;
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
