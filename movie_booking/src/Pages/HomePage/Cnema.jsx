import React from 'react'
import Slider from '../../Components/SliderItems/Slider'
import Poster from '../../Components/Assets/Poster-NhaBaNu.png'
import Voucher from '../../Components/Assets/VoucherSlider.png'
import SearchingBar from '../../Components/SearchingBar/SearchingBar'
import News from '../../Components/News/News'
import './Cnema.css'
const Cnema = () => {
  
const itemsFilm = Array.from({ length: 16 }, (_, index) => index + 1);
const itemsVoucher = Array.from({ length: 4 }, (_, index) => index + 1);
const itemsYMI = Array.from({ length: 9 }, (_, index) => index + 1);
return (
  <div class="Cnema main-body">
    <SearchingBar />
    {/* Phim moi nhat */}
  <Slider slidesToShow={4} slidesToScroll={2}>
    {itemsFilm.map((item) => (
        <div key={item} className="ContainerSliderCnema">
          <div className="poster-img">
            <img src={Poster} alt="Poster"/>
          </div>
          
          <div className="title>">
            <h2>Nha Ba Nu</h2>
          </div>
          <div className="buttonSDBYTN">
            <button>See Detail</button>
            <button>Book Your Ticket Now</button>
          </div>
        </div>
      ))}
  </Slider>
  {/* Voucher */}
  <Slider slidesToShow={1} slidesToScroll={1}>
    {itemsVoucher.map((item) => (
        <div key={item} className="ContainerVoucherCnema">
          <div className="voucher-img">
            <img src={Voucher} alt="Poster"/>
          </div>
        </div>
      ))}
  </Slider>
{/* News */}
      <News />
    
    <Slider slidesToShow={3} slidesToScroll={2}>
      {itemsYMI.map((item) => (
        <div key={item} className="ContainerYouMayInterest">
          <div className="poster-img">
            <img src={Poster} alt="Poster"/>
          </div>
          
          <div className="title>">
            <h2>Nha Ba Nu</h2>
          </div>
          <div className="buttonSDBYTN">
            <button>See Detail</button>
            <button>Book Your Ticket Now</button>
          </div>
        </div>
      ))}
    </Slider>
  </div>
  

);
}

export default Cnema
