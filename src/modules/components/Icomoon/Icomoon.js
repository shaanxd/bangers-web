import React from 'react';
import IcomoonReact from 'icomoon-react';
import iconSet from './selection';
import './Icomoon.css';

const Icomoon = props => {
  const { color, size, icon, className } = props;
  const actualClassName = className ? className : '';
  return (
    <IcomoonReact
      className={actualClassName}
      iconSet={iconSet}
      color={color}
      size={size}
      icon={icon}
    />
  );
};

export default Icomoon;
