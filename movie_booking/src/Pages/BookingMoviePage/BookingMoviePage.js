import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from '../../Components/SliderItems/Slider';
import CustomList from '../../Components/LoopItems/CustomList';
import DropdownItems from '../../Components/DropdownItems/DropdownItems';
import Poster from '../../Components/Assets/Poster-NhaBaNu.png';
import './BookingMoviePage.css';

const BookingMoviePage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedSubLocation, setSelectedSubLocation] = useState(null);
    const [selectedTicketType, setSelectedTicketType] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [formattedPrice, setFormattedPrice] = useState('');
    const navigate = useNavigate();

    const itemsDate = Array.from({ length: 25 }, (_, indexDate) => indexDate + 1);
    const locations = ["Ho Chi Minh", "Da Nang", "Quang Nam", "Ha Noi"];
    const locationsData = {
        "Ho Chi Minh": ["District 1", "District 2", "District 3", "District 4"],
        "Da Nang": ["Hai Chau", "Thanh Khe", "Cam Le"],
        "Quang Nam": ["Tam Ky", "Hoi An", "Dien Ban"],
        "Ha Noi": ["Hoan Kiem", "Ba Dinh", "Hai Ba Trung"]
    };

    const handleTimeSelect = (time) => setSelectedTime(time);
    const handleDateSelect = (date) => setSelectedDate(date);
    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        setSelectedSubLocation(null);
    };
    const handleSubLocationSelect = (subLocation) => setSelectedSubLocation(subLocation);
    const handleTicketTypeSelect = (type) => {
        setSelectedTicketType(type);
        setSelectedTime(null);
    };

    useEffect(() => {
        if (selectedTicketType) {
            const ticketPrices = {
                'REGULAR 2D': 100000,
                'GOLD CLASS 2D': 200000,
                'VELVET 2D': 300000
            };
            const totalPrice = ticketPrices[selectedTicketType];
            const price = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
            setFormattedPrice(price);
        }
    }, [selectedTicketType]);

    const handleBuyNow = () => {
        if (!selectedDate || !selectedLocation || !selectedSubLocation || !selectedTicketType || !selectedTime) {
            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 3000);
        } else {
            const ticketPrices = {
                'REGULAR 2D': 100000,
                'GOLD CLASS 2D': 200000,
                'VELVET 2D': 300000
            };
            const totalPrice = ticketPrices[selectedTicketType];
            const formattedPrice = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice);
            setFormattedPrice(formattedPrice);
            console.log('Total Price:', formattedPrice);

            // Điều hướng với các tham số cần thiết
            navigate(`/SelectYourSeat?selectedDate=${selectedDate}&selectedTime=${selectedTime}&selectedTicketType=${selectedTicketType}&formattedPrice=${encodeURIComponent(formattedPrice)}`);
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
                            <div className="movie">
                                <span>{selectedTime} ({selectedTicketType}) - {formattedPrice}</span>
                            </div>
                        </div>

                        <button onClick={handleBuyNow}>BUY NOW</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingMoviePage;
