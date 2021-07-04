import React, { useState } from 'react';
import { SliderData } from './SliderData';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { Container } from '@material-ui/core';
const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;
   
    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };
  
    const prevSlide = () => {
      setCurrent(current === 0 ? length - 1 : current - 1);
    };
  
    if (!Array.isArray(slides) || slides.length <= 0) {
      return null;
    }
    return ( 
        <section className='relative  justify-center align-baseline flex '>
        <FaArrowAltCircleLeft className='absolute text-white text-2xl left-1 z-10 top-2/4 bg-gray-800 h-7 w-7 rounded-full opacity-30 flex items-center justify-center' onClick={prevSlide} />
        <FaArrowAltCircleRight className='absolute text-white text-2xl right-1 z-10 top-2/4 bg-gray-800 h-7 w-7 rounded-full opacity-30 flex items-center justify-center' onClick={nextSlide} />
        {SliderData.map((slide, index) => {
          return (
            <div
              className={index === current ? 'opacity-100 transition duration-1000 '  : 'opacity-0 transition duration-1000 ease-out'}
              key={index}
            >
              {index === current && (
                 
                     <p className='text-gray-800 text-lg italic '> {slide} </p>
                
              )}
            </div>
          );
        })}
      </section>
    );
    
}
 
export default ImageSlider;