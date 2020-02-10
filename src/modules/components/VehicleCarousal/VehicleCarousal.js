import React from 'react';
import Slider from 'react-slick';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

import { Vehicle } from '../';

import styles from './VehicleCarousal.module.css';

const LeftButton = props => {
  return (
    <div style={props.style} onClick={props.onClick} className={styles.prevArrowBtn}>
      <IoIosArrowDropleft size={25} />
    </div>
  );
};

const RightButton = props => {
  return (
    <div style={props.style} onClick={props.onClick} className={styles.nextArrowBtn}>
      <IoIosArrowDropright size={25} />
    </div>
  );
};

const VehicleCarousal = props => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <LeftButton />,
    nextArrow: <RightButton />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          swipeToSlide: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
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
      return <Vehicle key={carouselItem.id} onBookClick={onBookClick} vehicle={carouselItem} />;
    });
  };

  const renderLoading = () => {
    return <h1>Loading</h1>;
  };

  const renderError = () => {
    return <h1>{error}</h1>;
  };

  const itemToRender = error ? renderError() : isLoading ? renderLoading() : renderCarouselList();
  return <div className={styles.parentDiv}>{itemToRender}</div>;
};

export default VehicleCarousal;
