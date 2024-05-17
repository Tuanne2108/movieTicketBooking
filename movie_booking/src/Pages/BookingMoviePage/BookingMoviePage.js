import React, { useState } from 'react';
import Slider from '../../Components/SliderItems/Slider';
import CustomList from '../../Components/LoopItems/CustomList';
import DropdownItems from '../../Components/DropdownItems/DropdownItems';
import Poster from '../../Components/Assets/Poster-NhaBaNu.png';
import './BookingMoviePage.css';

const BookingMoviePage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedSubLocation, setSelectedSubLocation] = useState(null);
    const [ticketType, setTicketType] = useState(null);
    const [subLocations, setSubLocations] = useState([]);

    const itemsDate = Array.from({ length: 25 }, (_, indexDate) => indexDate + 1);
    const locations = ["Ho Chi Minh", "Da Nang", "Quang Nam", "Ha Noi"];
    const itemsTime = Array.from({ length: 8 }, (_, indexTime) => indexTime + 1);

    const locationsData = {
        "Ho Chi Minh": ["District 1", "District 2", "District 3", "District 4"],
        "Da Nang": ["Hai Chau", "Thanh Khe", "Cam Le"],
        "Quang Nam": ["Tam Ky", "Hoi An", "Dien Ban"],
        "Ha Noi": ["Hoan Kiem", "Ba Dinh", "Hai Ba Trung"]
    };

    const handleTimeSelect = (time, type) => {
        console.log(`Time selected: ${time}, Ticket type: ${type}`);
        setSelectedTime(time);
        setTicketType(type);
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

                        {/* REGULAR 2D Tickets */}
                        <div className="chooseTime-container">
                            <Slider slidesToShow={4} slidesToScroll={4}>
                                {itemsTime.map((time, index) => (
                                    <div key={index} className={`TimeAvailable ${selectedTime === time && ticketType === 'REGULAR 2D' ? 'active' : ''}`}>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="movieTimeRegular"
                                                id={`movieTimeRegular${index}`}
                                                value={time}
                                                checked={selectedTime === time && ticketType === 'REGULAR 2D'}
                                                onChange={() => handleTimeSelect(time, 'REGULAR 2D')}
                                            />
                                            <label className="form-check-label" htmlFor={`movieTimeRegular${index}`}>
                                                <div className="date-month">
                                                    <span>23:00</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        {/* GOLD CLASS 2D Tickets */}
                        <div className="chooseTime-container">
                            <Slider slidesToShow={4} slidesToScroll={4}>
                                {itemsTime.map((time, index) => (
                                    <div key={index} className={`TimeAvailable ${selectedTime === time && ticketType === 'GOLD CLASS 2D' ? 'active' : ''}`}>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="movieTimeGold"
                                                id={`movieTimeGold${index}`}
                                                value={time}
                                                checked={selectedTime === time && ticketType === 'GOLD CLASS 2D'}
                                                onChange={() => handleTimeSelect(time, 'GOLD CLASS 2D')}
                                            />
                                            <label className="form-check-label" htmlFor={`movieTimeGold${index}`}>
                                                <div className="date-month">
                                                    <span>23:00</span>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                         {/* REGULAR 2D Tickets */}
                        <h2>REGULAR 2D</h2>
                        <CustomList 
                            items={itemsTime} 
                            selectedTime={selectedTime} 
                            onTimeSelect={handleTimeSelect} 
                            ticketType='REGULAR 2D' 
                            itemsPerRow={4}
                        />
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
                                    {selectedSubLocation && (
                                        <div className="locationChosen-CityDistrict">
                                            <span className="child-3 sublocationCustomerChosen">
                                                {selectedSubLocation}
                                            </span>
                                            <span className="child-2 locationCustomerChosen">
                                                {selectedLocation}
                                            </span>
                                        </div>
                                    )}
                                    {selectedDate && (
                                        <span className="child-1 dateCustomerChosen">
                                            {selectedDate}
                                        </span>
                                    )}
                                    {selectedTime && (
                                        <span className="child-4 genre">
                                            {selectedTime} ({ticketType})
                                        </span>
                                    )}
                                </div>
                                <div className="note-buttonBuyNow container-2">
                                    <span><i>* Seat selection can be made later</i></span>
                                    <button>BUY NOW</button>
                                </div>
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
