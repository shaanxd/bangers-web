import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { VehicleCarousal } from '../../components';
import { get_carousel } from '../../actions/vehicles';

const LandingScreen = props => {
  const {
    vehicles: { carouselList, carouselListLoading, carouselListError }
  } = props;

  useEffect(() => {
    if (carouselList.length === 0) {
      props.getCarousel();
    }
    // eslint-disable-next-line
  }, []);

  const handleOnBookClick = vehicleID => {
    props.history.push(`/vehicles/${vehicleID}`);
  };

  return (
    <div>
      <VehicleCarousal
        vehicles={carouselList}
        isLoading={carouselListLoading}
        error={carouselListError}
        onBookClick={handleOnBookClick}
      />
    </div>
  );
};

const mapStateToProps = ({ auth, vehicles }, ownProps) => {
  return {
    auth,
    vehicles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCarousel: () => {
      dispatch(get_carousel());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
);
