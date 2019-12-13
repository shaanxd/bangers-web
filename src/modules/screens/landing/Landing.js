import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { VehicleCarousal } from '../../components';
import { get_carousel } from '../../actions/vehicles';

const LandingScreen = props => {
  const {
    carouselList,
    carouselListLoading,
    carouselListError
  } = props.vehicles;

  useEffect(() => {
    if (carouselList.length === 0) props.getCarousel();
  }, []);

  return (
    <div>
      <VehicleCarousal
        carouselData={carouselList}
        isLoading={carouselListLoading}
        carouselError={carouselListError}
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen);
