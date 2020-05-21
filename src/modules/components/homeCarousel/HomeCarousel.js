import React from 'react';
import Slider from 'react-slick';

import { SliderButton, AppButton, Vehicle, PageHeader } from '..';

import './HomeCarousel.css';
import styles from './HomeCarousel.module.css';

const HomeCarousel = (props) => {
  const { items, onItemClick, header, onMoreClick } = props;

  const miniSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToScroll: 1,
          slidesToShow: 1,
          infinite: true,
          swipeToSlide: true,
        },
      },
    ],
    prevArrow: <SliderButton isPrev />,
    nextArrow: <SliderButton />,
  };

  const renderVehicleCarousel = () => {
    const components = items.map((vehicle) => {
      return <Vehicle vehicle={vehicle} onBookClick={onItemClick} key={vehicle.id} />;
    });
    return <Slider {...miniSettings}>{components}</Slider>;
  };

  return (
    <div className={styles.main__div}>
      <div className={styles.header__div}>
        <PageHeader text={header} />
      </div>
      <div className={styles.carousel__div}>
        {renderVehicleCarousel()}
        <AppButton text="View more" onClick={onMoreClick} type="button" containerStyle={{ marginTop: '40px' }} />
      </div>
    </div>
  );
};

export default HomeCarousel;
