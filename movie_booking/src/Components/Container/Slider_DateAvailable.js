import React, { useState } from 'react';
import './Slider_DateAvailable.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Slider_DateAvailable = () => {
    const RepeatArray = Array.from({ length: 10 }, (_, i) => i + 1); // Tạo mảng chứa 9 phần tử
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesToShow = 5; // Số lượng thẻ div được hiển thị cùng lúc

    const nextSlide = () => {
        if (currentIndex < RepeatArray.length - slidesToShow) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const slideWidth = 100 / slidesToShow; // Tính toán độ rộng của mỗi slide

    return (
        <div className="date-available-slider-container col-1">
            <div className="container-avs">
                <div className="title">
                </div>
                <div className="body-avs">
                    <button className="prev" onClick={prevSlide} style={{ display: currentIndex === 0 ? 'none' : 'block' }}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className="slider" style={{ overflowX: 'hidden' }}>
                        <div className="slides" style={{ display: 'flex', transition: 'transform ease-out 0.45s', transform: `translateX(-${currentIndex * slideWidth}%)` }}>
                            {RepeatArray.map((item, index) => (
                                <div key={index} className="slide" style={{ flex: `0 0 ${slideWidth}%`, maxWidth: `${slideWidth}%` }}>
                                    <div className="info">
                                        <span className="date-month">15 Oct</span>
                                        <span className="day">MON</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <button className="next" onClick={nextSlide} style={{ display: currentIndex === RepeatArray.length - slidesToShow ? 'none' : 'block' }}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Slider_DateAvailable;
