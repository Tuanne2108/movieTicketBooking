import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './styleSlider.css';

function SliderFilm({ children, slidesToShow, slidesToScroll }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const sliderTrackRef = useRef(null);
  const slideWidth = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const startPositionRef = useRef(0);
  const [isSlideChangeAllowed, setIsSlideChangeAllowed] = useState(true);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    startPositionRef.current = e.clientX;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const threshold = 5; // Ngưỡng nhất định

  const handleDragMove = (e) => {
    if (isDragging && isSlideChangeAllowed) {
      const dragDistance = e.clientX - dragStartX;
      if (Math.abs(dragDistance) > threshold) { // Kiểm tra ngưỡng
        if (dragDistance > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
        // Tạo độ trễ 1 giây trước khi cho phép nhận lần kéo chuột tiếp theo
        setIsSlideChangeAllowed(false); // Ngưng nhận sự kiện kéo chuột
        setTimeout(() => {
          setIsSlideChangeAllowed(true); // Cho phép nhận sự kiện kéo chuột sau 1 giây
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      handleDragMove(e);
    };
    const handleMouseUp = () => {
      handleDragEnd();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };  
  }, [isDragging, handleDragMove]);

  useEffect(() => {
    // Kiểm tra xem có thể bấm nút prev hay không
    setCanPrev(currentSlide > 0);
  
    // Kiểm tra xem có thể bấm nút next hay không
    const itemsCount = React.Children.count(children);
    setCanNext(currentSlide + slidesToShow < itemsCount);
  }, [currentSlide, children, slidesToShow]);

  useEffect(() => {
    // Kiểm tra xem có phần tử con hay không
    const itemsCount = React.Children.count(children);
    if (itemsCount === 0) {
      return;
    }
  
    // Tính toán và lưu chiều rộng của mỗi phần tử con
    slideWidth.current = sliderTrackRef.current.offsetWidth / slidesToShow;
  
    // Thiết lập lại vị trí của slider khi số lượng slide thay đổi
    setCurrentSlide(0);
  }, [children, slidesToShow]);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + slidesToScroll, React.Children.count(children) - slidesToShow));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - slidesToScroll, 0));
  };

  const handleMouseDown = () => {
    setIsHovering(true);
  };

  const handleMouseUp = () => {
    setIsHovering(false);
  };

  return (
    <div className="container-outside-slider">
      <button className="slider-prev" onClick={prevSlide} disabled={!canPrev}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div
        className={`slider-container ${isHovering ? 'hovering' : ''}`}
        onMouseDown={handleDragStart}
        onMouseUp={handleMouseUp}
        onMouseMove={handleDragMove}
        onMouseLeave={handleDragEnd}
        ref={sliderTrackRef}
      >
        <div className="slider-track" style={{ transform: `translateX(-${currentSlide * slideWidth.current}px)` }}>
          {React.Children.map(children, (child) => (
            <div className="slider-item" style={{ width: `${slideWidth.current}px` }}>
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

SliderFilm.defaultProps = {
  slidesToShow: 3,
  slidesToScroll: 1
};

export default SliderFilm;
