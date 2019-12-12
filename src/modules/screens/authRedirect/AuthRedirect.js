import React, { useEffect } from 'react';
import QueryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { auth_redirect } from '../../actions/auth';

const AuthRedirectScreen = props => {
  useEffect(() => {
    const { token, type, expiresIn } = QueryString.parse(props.location.search);
    const authDetails = {
      expiresInSeconds: parseInt(expiresIn),
      authToken: token,
      userType: type
    };
    props.authRedirect(authDetails);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (props.auth.authDetails) {
      props.history.replace('/');
    }
  });
  return (
    <div>
      <h1>This is signin</h1>
      {JSON.stringify(props.auth)}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    authRedirect: authDetails => {
      dispatch(auth_redirect(authDetails));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AuthRedirectScreen)
);
