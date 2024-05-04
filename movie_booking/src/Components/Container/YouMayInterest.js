import React, { useState } from 'react';
import './YouMayInterest.css';
import Poster from '../Assets/Poster-YMT.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const YouMayInterest = () => {
    const RepeatArray = 6;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < 4) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="you-may-interest">
      <div className="container-ymt">
        <div className="title">
          <h2>You May Interest</h2>
        </div>
        <div className="body-ymt">
        <button className="prev" onClick={prevSlide} style={{ display: currentIndex === 0 ? 'none' : 'block' }}>
        <FontAwesomeIcon icon={faArrowLeft} />
        </button>
          <div className="slider">
            <div className="slides" style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}>
              {[...Array(RepeatArray)].map((_, index) => (
                <div key={index} className="slide">
                  <div className="poster">
                    <img src={Poster} alt="" />
                  </div>
                  <div className="info">
                    <span>Resident Evil: Welcome to Raccoon City</span>
                  </div>
                  <div className="button-sd-bytn">
                    <button className="sd">See Details</button>
                    <button className="bytn">Buy Your Ticket Now</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <button className="next" onClick={nextSlide} style={{ display: currentIndex === 3 ? 'none' : 'block' }}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default YouMayInterest;
