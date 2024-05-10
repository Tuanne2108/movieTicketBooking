import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CardSlider.css";
import Poster from '../Assets/Poster-NhaBaNu.png'

function FilmSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
    <div className="Film slider-card">
      <div className="slider-container">
        <Slider {...settings}>
          <div className="Poster-Slider">
            <img src={Poster} alt="" className="Poster-Film"/>
            <h3>Film moi nhat 1</h3>
            <div className="buttons sd-bytn">
              <button className="button sd">
                <a href="#">See Details</a>
              </button>
              <button className="button bytn">
                <a href="#">Buy Your Ticket Now</a>
              </button>
            </div>
          </div>
          <div className="Poster-Slider">
            <img src={Poster} alt="" className="Poster-Film"/>
            <h3>Film moi nhat 2</h3>
          </div>
          <div className="Poster-Slider">
            <img src={Poster} alt="" className="Poster-Film"/>
            <h3>Film moi nhat 3</h3>
          </div>
          <div className="Poster-Slider">
            <img src={Poster} alt="" className="Poster-Film"/>
            <h3>Film moi nhat 4</h3>
          </div>
          <div className="Poster-Slider">
            <img src={Poster} alt="" className="Poster-Film"/>
            <h3>Film moi nhat 5</h3>
          </div>
          <div className="Poster-Slider">
            <img src={Poster} alt="" className="Poster-Film"/>
            <h3>Film moi nhat 6</h3>
          </div>
          
        </Slider>
    </div>
    </div>
    
  );
}

export default FilmSlider;