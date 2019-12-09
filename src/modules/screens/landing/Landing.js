import React from 'react';
import { connect } from 'react-redux';

const LandingScreen = props => {
  return (
    <div>
      <h1>This is landing page</h1>
      <h1>{JSON.stringify(props.auth.authDetails)}</h1>
      <h1>{`isLoggingOut: ${props.auth.isLoggingOut}`}</h1>
      <h1>{`logoutError: ${props.auth.logoutError}`}</h1>
    </div>
  );
};

const mapStateToProps = ({ auth }, ownProps) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
