import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import './styleSlider.css';

function Slider({ children, slidesToShow, slidesToScroll }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    // Kiểm tra xem có thể bấm nút prev hay không
    setCanPrev(currentSlide > 0);

    // Kiểm tra xem có thể bấm nút next hay không
    const itemsCount = React.Children.count(children);
    setCanNext(currentSlide + slidesToShow < itemsCount);
  }, [currentSlide, children, slidesToShow]);

  const nextSlide = () => {
    setCurrentSlide(currentSlide + slidesToScroll);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide - slidesToScroll);
  };

  return (
    <div className="container-outside-slider">
      <button className="slider-prev" onClick={prevSlide} disabled={!canPrev}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>


      
      <div className="slider-container">
        <div className="slider-track" style={{ transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)` }}>
          {React.Children.map(children, (child, index) => (
            <div className="slider-item" style={{ width: `${100 / slidesToShow}%` }}>
              {child}
            </div>
          ))}
        </div>
      </div>
      
      <button className="slider-next" onClick={nextSlide} disabled={!canNext}>
      <FontAwesomeIcon icon={faChevronRight} /></button>
    </div>
  );
}

Slider.defaultProps = {
  slidesToShow: 3,
  slidesToScroll: 3
};

export default Slider;
