import React, { Component } from 'react';
import { connect } from 'react-redux';

class LandingScreen extends Component {
  render() {
    return (
      <div>
        <h1>This is landing page</h1>
        <h1>{JSON.stringify(this.props.auth)}</h1>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
