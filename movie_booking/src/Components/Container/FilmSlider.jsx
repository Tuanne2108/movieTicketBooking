import React, { useState } from 'react';
import './FilmSlider.css';
import Poster from '../Assets/Poster-NhaBaNu.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const FilmSlider = () => {
    const RepeatArray = Array.from({ length: 9 }, (_, i) => i + 1); // Tạo mảng chứa 9 phần tử
    const [currentIndex, setCurrentIndex] = useState(0);
    const slidesToShow = 4; // Số lượng thẻ div được hiển thị cùng lúc

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
        <div className="film-poster-slider">
            <div className="container-fps">
                <div className="title">
                    <h2>Hot Film</h2>
                </div>
                <div className="body-fps">
                    <button className="prev" onClick={prevSlide} style={{ display: currentIndex === 0 ? 'none' : 'block' }}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <div className="slider" style={{ overflowX: 'hidden' }}>
                        <div className="slides" style={{ display: 'flex', transition: 'transform ease-out 0.45s', transform: `translateX(-${currentIndex * slideWidth}%)` }}>
                            {RepeatArray.map((item, index) => (
                                <div key={index} className="slide" style={{ flex: `0 0 ${slideWidth}%`, maxWidth: `${slideWidth}%` }}>
                                    <div className="poster">
                                        <img src={Poster} alt="" />
                                    </div>
                                    <div className="info">
                                        <span>Nha Ba Nu</span>
                                    </div>
                                    <div className="button-sd-bytn">
                                        <button className="sd">See Details</button>
                                        <button className="bytn">Buy Your Ticket Now</button>
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

export default FilmSlider;
