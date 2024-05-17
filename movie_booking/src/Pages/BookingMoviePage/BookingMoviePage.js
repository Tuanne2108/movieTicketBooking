import React, { useState } from 'react';
import Slider from '../../Components/SliderItems/Slider';
import DropdownItems from '../../Components/DropdownItems/DropdownItems';
import Poster from '../../Components/Assets/Poster-NhaBaNu.png';
import './BookingMoviePage.css';

const BookingMoviePage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedSubLocation, setSelectedSubLocation] = useState(null);
    const [subLocations, setSubLocations] = useState([]);
    const [ticketType, setTicketType] = useState(null);

    const itemsDate = Array.from({ length: 25 }, (_, indexDate) => indexDate + 1);
    const locations = ["Ho Chi Minh", "Da Nang", "Quang Nam", "Ha Noi"];
    const itemsTime = Array.from({ length: 8 }, (_, indexTime) => indexTime + 1);

    const locationsData = {
        "Ho Chi Minh": ["District 1", "District 2", "District 3", "District 4"],
        "Da Nang": ["Hai Chau", "Thanh Khe", "Cam Le"],
        "Quang Nam": ["Tam Ky", "Hoi An", "Dien Ban"],
        "Ha Noi": ["Hoan Kiem", "Ba Dinh", "Hai Ba Trung"]
    };

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
        setSubLocations(locationsData[location] || []);
        setSelectedSubLocation(null);  // Reset sub-location when a new location is selected
    };

    const handleSubLocationSelect = (subLocation) => {
        console.log('Sub-location selected:', subLocation);
        setSelectedSubLocation(subLocation);
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

                        {subLocations.length > 0 && (
                            <div className="dropdown-sublocation">
                                <DropdownItems items={subLocations} selectedItem={selectedSubLocation} handleItemClick={handleSubLocationSelect} />
                            </div>
                        )}
                        {/* khi chọn ở đây thì trả về vé hạng REGULAR 2D */}
                        <div className="chooseTime-container">
                            <Slider slidesToShow={4} slidesToScroll={4}>
                                {itemsTime.map((time, index) => (
                                    <div key={index} className={`TimeAvailable ${selectedTime === time && ticketType === 'REGULAR 2D' ? 'active' : ''}`}>
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
                        {/* khi chọn ở đây thì trả về vé hạng GOLD CLASS 2D */}
                        <div className="chooseTime-container">
                            <Slider slidesToShow={4} slidesToScroll={4}>
                                {itemsTime.map((time, index) => (
                                    <div key={index} className={`TimeAvailable ${selectedTime === time && ticketType === 'GOLD CLASS 2D' ? 'active' : ''}`}>
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

                    <div className="col-2">
                        <div className="chosen-movie-info">
                            <div className="movie-img">
                                <img src={Poster} alt="" />
                            </div>
                            <div className="movie-title">
                                <h1 className="title">SPIDERMAN: NO WAY HOME</h1>
                                <div className="more-info">
                                    <div className="col-1">
                                        <span className="child-1 title">Genre</span>
                                        <span className="child-2 title">Duration</span>
                                        <span className="child-3 title">Director</span>
                                        <span className="child-4 title">Age Rating</span>
                                    </div>
                                    <div className="col-2">
                                        <span className="Genre">Action</span>
                                        <span className="Duration">2 hours 28 minutes</span>
                                        <span className="Director">Jon Watts</span>
                                        <span className="Age Rating">SU</span>
                                    </div>
                                </div>   
                            </div>
                            <div className="movie-demoTicket">
                                <div className="ticket-info container-1">
                                    <div className="locationChosen-CityDistrict">
                                        <span className="child-3 sublocationCustomerChosen">
                                            {selectedSubLocation ? `${selectedSubLocation}` : 'Location not selected'}
                                        </span>
                                        <span className="child-2 locationCustomerChosen">
                                            {selectedLocation}
                                        </span>
                                    </div>
                                    
                                    <span className="child-1 dateCustomerChosen">
                                        {selectedDate ? `${selectedDate}` : 'Date not selected'}
                                    </span>
                                    <span className="genre">
                                        {selectedTime ? `${selectedTime}` : 'Time not selected'}
                                        ({ticketType ? `${ticketType}` : 'Ticket not selected'})
                                    </span>
                                </div>
                                <div className="container-2">
                                    <span><i>* Seat selection can be made later</i></span>
                                </div>
                            </div>
                            <div className="movie-finalResult">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bookingticket"></div>
        </div>
    );
};

export default BookingMoviePage;
