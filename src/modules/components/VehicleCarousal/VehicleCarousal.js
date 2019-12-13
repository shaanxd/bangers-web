import React from 'react';
import Slider from 'react-slick';

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
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  const { carouselData, isLoading, carouselError } = props;

  const renderCarouselList = () => {
    const listItems = renderListItems();
    return <Slider {...settings}>{listItems}</Slider>;
  };

  const renderListItems = () => {
    return carouselData.map(carouselItem => {
      return (
        <div className="carousel__parent-div">
          <h3>{carouselItem.name}</h3>
        </div>
      );
    });
  };

  const renderLoading = () => {
    return <h1>Loading</h1>;
  };

  const renderError = () => {
    return <h1>{carouselError}</h1>;
  };

  const itemToRender = carouselError
    ? renderError()
    : isLoading
    ? renderLoading()
    : renderCarouselList();
  return <div className="carousal__main-div">{itemToRender}</div>;
};

export default VehicleCarousal;
