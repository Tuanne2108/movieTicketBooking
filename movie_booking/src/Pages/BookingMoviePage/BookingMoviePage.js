import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Slider from '../../Components/SliderItems/Slider';
import CustomList from '../../Components/LoopItems/CustomList';
import DropdownItems from '../../Components/DropdownItems/DropdownItems';
import Poster from '../../Components/Assets/Poster-NhaBaNu.png';
import './BookingMoviePage.css';

const BookingMoviePage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedSubLocation, setSelectedSubLocation] = useState(null);
    const [selectedTicketType, setSelectedTicketType] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    const itemsDate = Array.from({ length: 25 }, (_, indexDate) => indexDate + 1);
    const locations = ["Ho Chi Minh", "Da Nang", "Quang Nam", "Ha Noi"];

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
        setSelectedSubLocation(null);  // Reset sub-location when a new location is selected
    };

    const handleSubLocationSelect = (subLocation) => {
        console.log('Sub-location selected:', subLocation);
        setSelectedSubLocation(subLocation);
    };

    const handleTicketTypeSelect = (type) => {
        console.log('Ticket type selected:', type);
        setSelectedTicketType(type);
        setSelectedTime(null); // Reset selected time when a new ticket type is selected
    };

    const handleBuyNow = () => {
        // Kiểm tra các thông tin đã nhập đầy đủ chưa
        if (!selectedDate || !selectedLocation || !selectedSubLocation || !selectedTicketType || !selectedTime) {
            // Nếu không đủ thông tin, hiển thị một popup cảnh báo
            setShowAlert(true);
            // Tự động ẩn popup sau 3 giây
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } else {
            // Nếu đủ thông tin, chuyển hướng sang trang "SELECT YOUR SEAT"
            navigate(`/SelectYourSeat?selectedDate=${selectedDate}&selectedTime=${selectedTime}&selectedTicketType=${selectedTicketType}`);
        }
    };
    
    

    return (
        <div className="main-bookingticket">
            <div className="body-bookingticket">
                <div className={`popup ${showAlert ? 'show' : ''}`}>
                    {showAlert && (
                        <div className="alert">
                            <p>Vui lòng điền đầy đủ thông tin:</p>
                            <ul>
                                {!selectedDate && <li>Ngày</li>}
                                {!selectedLocation && <li>Địa điểm</li>}
                                {!selectedSubLocation && <li>Phân khu</li>}
                                {!selectedTicketType && <li>Loại vé</li>}
                                {!selectedTime && <li>Thời gian</li>}
                            </ul>
                        </div>
                    )}
                </div>


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

                        {selectedLocation && (
                            <div className="dropdown-sublocation">
                                <DropdownItems items={locationsData[selectedLocation] || []} selectedItem={selectedSubLocation} handleItemClick={handleSubLocationSelect} />
                            </div>
                        )}

                        {/* Ticket Type Selection */}
                        <div className="ticket-type-selection">
                            <h2>Select Ticket Type</h2>
                            <div>
                                <input
                                    type="radio"
                                    id="regular2d"
                                    name="ticketType"
                                    value="REGULAR 2D"
                                    checked={selectedTicketType === 'REGULAR 2D'}
                                    onChange={() => handleTicketTypeSelect('REGULAR 2D')}
                                />
                                <label htmlFor="regular2d">Regular 2D</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="goldClass2d"
                                    name="ticketType"
                                    value="GOLD CLASS 2D"
                                    checked={selectedTicketType === 'GOLD CLASS 2D'}
                                    onChange={() => handleTicketTypeSelect('GOLD CLASS 2D')}
                                />
                                <label htmlFor="goldClass2d">Gold Class 2D</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="velvet2d"
                                    name="ticketType"
                                    value="VELVET 2D"
                                    checked={selectedTicketType === 'VELVET 2D'}
                                    onChange={() => handleTicketTypeSelect('VELVET 2D')}
                                />
                                <label htmlFor="velvet2d">Velvet 2D</label>
                            </div>
                        </div>

                        {/* Time Selection */}
                        {selectedTicketType && (
                            <div className="time-selection">
                                <h2>Select Time</h2>
                                <CustomList 
                                    items={itemsDate} 
                                    selectedTime={selectedTime} 
                                    onTimeSelect={handleTimeSelect} 
                                    ticketType={selectedTicketType}
                                />
                            </div>
                        )}

            
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
                                                        <span
                                                        className="child-2 locationCustomerChosen">
                                                        {selectedLocation}
                                                    </span>
                                                </div>
                                            )}
                                            {selectedDate && (
                                                <span className="child-1 dateCustomerChosen">
                                                    {selectedDate}
                                                </span>
                                            )}
                                            {/* Display selected time and ticket type */}
                                            {selectedTime && (
                                                <span className="child-4 genre">
                                                    {selectedTime} ({selectedTicketType})
                                                </span>
                                            )}
                                        </div>
                                        <div className="note-buttonBuyNow container-2">
                                            <span><i>* Seat selection can be made later</i></span>
                                            <button onClick={handleBuyNow}>BUY NOW</button>
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
            