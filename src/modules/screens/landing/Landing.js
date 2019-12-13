import React from 'react';
import { connect } from 'react-redux';
import { VehicleCarousal } from '../../components';

const LandingScreen = props => {
  return (
    <div>
      <VehicleCarousal />
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
