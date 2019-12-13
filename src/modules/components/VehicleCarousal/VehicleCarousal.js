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
  return (
    <div className="carousal__main-div">
      <Slider {...settings}>
        <div className="carousel__parent-div">
          <h3>1</h3>
        </div>
        <div className="carousel__parent-div">
          <h3>2</h3>
        </div>
        <div className="carousel__parent-div">
          <h3>3</h3>
        </div>
        <div className="carousel__parent-div">
          <h3>4</h3>
        </div>
        <div className="carousel__parent-div">
          <h3>5</h3>
        </div>
        <div className="carousel__parent-div">
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default VehicleCarousal;
