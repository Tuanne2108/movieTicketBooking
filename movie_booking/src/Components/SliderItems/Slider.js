import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './styleSlider.css';

function Slider({ children, slidesToShow, slidesToScroll }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const sliderTrackRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const animationID = useRef(0);
  const lastPosition = useRef(0);
  const hasMoved = useRef(false);

  useEffect(() => {
    setCanPrev(currentSlide > 0);
    const itemsCount = React.Children.count(children);
    setCanNext(currentSlide + slidesToShow < itemsCount);
  }, [currentSlide, children, slidesToShow]);

  useEffect(() => {
    const autoPlay = setInterval(() => {
      if (canNext) {
        nextSlide();
      } else {
        setCurrentSlide(0);
      }
    }, 10000); // 10 seconds

    return () => clearInterval(autoPlay);
  }, [canNext]);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + slidesToScroll, React.Children.count(children) - slidesToShow));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - slidesToScroll, 0));
  };

  const touchStart = (event) => {
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    animationID.current = requestAnimationFrame(animation);
    sliderTrackRef.current.style.cursor = 'grabbing';
  };

  const touchMove = (event) => {
    if (isDragging.current) {
      const currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
      currentTranslate.current = prevTranslate.current + currentPosition - startX.current;
      lastPosition.current = currentPosition;
      hasMoved.current = true;
    }
  };

  const touchEnd = () => {
    cancelAnimationFrame(animationID.current);
    isDragging.current = false;
    const movedBy = currentTranslate.current - prevTranslate.current;
    const itemsCount = React.Children.count(children);
    const itemWidth = sliderTrackRef.current.offsetWidth / slidesToShow;
    const threshold = 0.1 * itemWidth; // 0.1% of the item width

    if (hasMoved.current) {
      if (movedBy < -threshold && canNext) {
        nextSlide();
      } else if (movedBy > threshold && canPrev) {
        prevSlide();
      } else {
        // Adjust back to the current slide
        const newPosition = -(currentSlide * (100 / slidesToShow));
        currentTranslate.current = newPosition;
        prevTranslate.current = newPosition;
        setSliderPosition();
      }
    }

    sliderTrackRef.current.style.cursor = 'grab'; // Reset cursor to 'grab' after releasing
    hasMoved.current = false;
  };

  const animation = () => {
    setSliderPosition();
    if (isDragging.current) {
      requestAnimationFrame(animation);
    }
  };

  const setSliderPosition = () => {
    if (sliderTrackRef.current) {
      sliderTrackRef.current.style.transform = `translateX(${currentTranslate.current}%)`;
    }
  };

  useEffect(() => {
    if (!isDragging.current) {
      const newPosition = -(currentSlide * (100 / slidesToShow));
      currentTranslate.current = newPosition;
      prevTranslate.current = newPosition;
      sliderTrackRef.current.style.transition = 'transform 0.3s ease';
      setSliderPosition();
    }
  }, [currentSlide, slidesToShow]);

  return (
    <div className="container-outside-slider">
      <button className="slider-prev" onClick={prevSlide} disabled={!canPrev}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div
        className="slider-container"
        onMouseDown={touchStart}
        onMouseMove={touchMove}
        onMouseUp={touchEnd}
        onMouseLeave={touchEnd}
        onTouchStart={touchStart}
        onTouchMove={touchMove}
        onTouchEnd={touchEnd}
      >
        <div className="slider-track" ref={sliderTrackRef}>
          {React.Children.map(children, (child) => (
            <div className="slider-item" style={{ width: `${100 / slidesToShow}%` }}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <button className="slider-next" onClick={nextSlide} disabled={!canNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
}

Slider.defaultProps = {
  slidesToShow: 3,
  slidesToScroll: 3
};

export default Slider;
