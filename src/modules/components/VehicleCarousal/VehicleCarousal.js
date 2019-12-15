import React from 'react';
import Slider from 'react-slick';

import { Vehicle } from '../';

import './VehicleCarousal.css';

const VehicleCarousal = props => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          swipeToSlide: true
        }
      }
    ]
  };

  const { vehicles, isLoading, error, onBookClick } = props;

  const renderCarouselList = () => {
    const listItems = renderListItems();
    return <Slider {...settings}>{listItems}</Slider>;
  };

  const renderListItems = () => {
    return vehicles.map(carouselItem => {
      return (
        <Vehicle
          key={carouselItem.id}
          onBookClick={onBookClick}
          vehicle={carouselItem}
        />
      );
    });
  };

  const renderLoading = () => {
    return <h1>Loading</h1>;
  };

  const renderError = () => {
    return <h1>{error}</h1>;
  };

  const itemToRender = error
    ? renderError()
    : isLoading
    ? renderLoading()
    : renderCarouselList();
  return <div className="carousal__main-div">{itemToRender}</div>;
};

export default VehicleCarousal;
