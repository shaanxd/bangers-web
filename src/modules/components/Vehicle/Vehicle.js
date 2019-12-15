import React from 'react';

import { getImageUrl } from '../../helper/vehicleHelper';

import './Vehicle.css';

const Vehicle = props => {
  const {
    vehicle: { id, image, name },
    onBookClick
  } = props;

  const handleOnClick = () => {
    onBookClick(id);
  };

  return (
    <div key={id} className="vehicle__parent-div">
      <img alt="haha" className="vehicle__image" src={getImageUrl(image)} />
      <label className="vehicle__name">{name}</label>
      <button
        className="vehicle__book-btn"
        type="button"
        onClick={handleOnClick}
      >
        Book
      </button>
    </div>
  );
};

export default Vehicle;
