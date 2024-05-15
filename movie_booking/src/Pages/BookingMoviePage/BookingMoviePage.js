import React, { useState } from 'react';
import Slider from '../../Components/SliderItems/Slider';
import DropdownItems from '../../Components/DropdownItems/DropdownItems';
import './BookingMoviePage.css';

const BookingMoviePage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const itemsDate = Array.from({ length: 25 }, (_, indexDate) => indexDate + 1);
    const locations = ["Ho Chi Minh", "Da Nang", "Quang Nam", "Ha Noi"];
    const itemsTime = Array.from({ length: 8 }, (_, indexTime) => indexTime + 1);

    const handleTimeSelect = (time) => {
        console.log('Time selected:', time);
        setSelectedTime(time);
    };

    const handleDateSelect = (date) => {
        console.log('Date selected:', date);
        setSelectedDate(date);
    };

    const handleLocationSelect = (location) => {
        console.log('Location selected:', location);
        setSelectedLocation(location);
    };

    return (
        <div className="main-bookingticket">
            <div className="body-bookingticket">
                <div className="container-bookingticket">
                    <div className="col-1">
                        <div className="title">
                            <h1>TIMETABLE</h1>
                            <span>Select the movie showtime you want to watch</span>
                        </div>

                        <div className="date-available-slider">
                            <Slider slidesToShow={5} slidesToScroll={5}>
                                {itemsDate.map((item) => (
                                    <div key={item} className={`DateAvailable ${selectedDate === item ? 'active' : ''}`}>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="movieDate"
                                                id={`movieDate${item}`}
                                                value={item}
                                                checked={selectedDate === item}
                                                onChange={() => handleDateSelect(item)}
                                            />
                                            <label className="form-check-label" htmlFor={`movieDate${item}`}>
                                                <div className="date-month">
                                                    <span>11th May</span>
                                                    <h3>SAT</h3>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        <div className="dropdown-location">
                            <DropdownItems items={locations} selectedItem={selectedLocation} handleItemClick={handleLocationSelect} />
                        </div>

                        <div className="chooseTime-container">
                            <Slider slidesToShow={4} slidesToScroll={4}>
                                {itemsTime.map((time, index) => (
                                    <div key={index} className={`TimeAvailable ${selectedTime === time ? 'active' : ''}`}>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="movieTime"
                                                id={`movieTime${index}`}
                                                value={time}
                                                checked={selectedTime === time}
                                                onChange={() => handleTimeSelect(time)}
                                            />
                                            <label className="form-check-label" htmlFor={`movieTime${index}`}>
                                                <div className="date-month">
                                                    <span>23:00</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bookingticket"></div>
        </div>
    );
};

export default BookingMoviePage;
