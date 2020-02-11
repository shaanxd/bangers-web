import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const SliderButton = props => {
  const { className, style, onClick, isPrev } = props;
  return (
    <div className={className} style={style} onClick={onClick}>
      {isPrev ? <IoIosArrowBack size={25} color="black" /> : <IoIosArrowForward size={25} color="black" />}
    </div>
  );
};

export default SliderButton;
