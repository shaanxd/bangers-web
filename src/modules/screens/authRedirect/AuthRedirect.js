import React, { useEffect } from 'react';
import QueryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { authSuccess } from '../../actions/auth';
import { Loading } from '../../components';

import styles from './AuthRedirect.module.css';

const AuthRedirect = props => {
  useEffect(() => {
    const { token, type, expiresIn } = QueryString.parse(props.location.search);
    const authData = {
      expiresInSeconds: parseInt(expiresIn),
      authToken: token,
      userType: type
    };
    props.authSuccess(authData);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.main__div}>
      <Loading text="Loading" />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: authData => {
      dispatch(authSuccess(authData));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRedirect));
