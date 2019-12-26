import React from 'react';
import { connect } from 'react-redux';

import styles from './Profile.module.css';

const ProfileScreen = props => {
  return <div className={styles.parentDiv}>This is profile screen</div>;
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
