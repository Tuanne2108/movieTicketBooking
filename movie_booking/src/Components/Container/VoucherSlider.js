import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./VoucherSlider.css";
import Voucher from '../Assets/VoucherSlider.png'

function VoucherSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="Voucher slider-card">
      <div className="slider-container">
        <Slider {...settings}>
          <div className="Voucher-Slider">
            <img src={Voucher} alt="" className="Voucher-Film"/>
          </div>
          <div className="Voucher-Slider">
            <img src={Voucher} alt="" className="Voucher-Film"/>
          </div>
          <div className="Voucher-Slider">
            <img src={Voucher} alt="" className="Voucher-Film"/>
          </div>
          <div className="Voucher-Slider">
            <img src={Voucher} alt="" className="Voucher-Film"/>
          </div>
          <div className="Voucher-Slider">
            <img src={Voucher} alt="" className="Voucher-Film"/>
          </div>
        </Slider>
    </div>
    </div>
    
  );
}

export default VoucherSlider;