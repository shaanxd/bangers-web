import React from 'react';

import { getImageUrl } from '../../helper/vehicleHelper';

import './Vehicle.css';

const Vehicle = props => {
  const {
    vehicle: { id, image, name },
    onBookClick
  } = props;
  return (
    <div key={id} className="vehicle__parent-div">
      <img alt="haha" className="vehicle__image" src={getImageUrl(image)} />
      <label className="vehicle__name">{name}</label>
      <button type="button" onClick={onBookClick}>
        Book
      </button>
    </div>
  );
};

export default Vehicle;
