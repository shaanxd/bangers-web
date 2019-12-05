import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from '../../actions/auth';

class LoginScreen extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.props.loginUser({ username: 'shaanxd1', password: '12345' });
          }}
        >
          Click me!
        </button>
        <h1>{JSON.stringify(this.props)}</h1>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }, ownProps) => {
  return {
    auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginUser: userData => {
      dispatch(login(userData));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
