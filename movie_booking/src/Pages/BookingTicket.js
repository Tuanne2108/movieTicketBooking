import React from 'react'
import Header from '../Components/Navbar/Navbar';
import Footer from '../Components/Navbar/Footer'
import SliderDate from '../Components/Container/Slider_DateAvailable'
import Location from '../Components/Container/Dropdown_Location'
import './styles/BookingTicket.css'


const BookingTicket = () => {
  return (
    <div className="main-bookingticket">
        <div className="header-bookingticket">
            <Header />
        </div>
        <div className="body-bookingticket">
            <div className="container-bookingticket">
                <div className="title">
                    <h1>TIMETABLE</h1>
                    <span>Select the movie showtime you want to watch</span>
                </div>

                <div className="date-available-slider">
                    <SliderDate />
                    <Location />
                </div>
            </div>
            
        </div>
        <div className="footer-bookingticket">
            <Footer />
        </div>

    </div>
  )
}

export default BookingTicket