import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Slider from '../../Components/SliderItems/Slider';
import CustomList from '../../Components/LoopItems/CustomList';
import DropdownItems from '../../Components/DropdownItems/DropdownItems';
import * as movieService from "../../services/MovieService";

import axios from "axios";
import './BookingMoviePage.css';



const BookingMoviePage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedSubLocation, setSelectedSubLocation] = useState(null);
    const [selectedTicketType, setSelectedTicketType] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedType, setSelectedType] = useState(null);

    const itemsDate = Array.from({ length: 25 }, (_, indexDate) => indexDate + 1);
    const locations = ["Ho Chi Minh", "DaNang", "QuangNam", "HaNoi"];
    
    const locationsData = {
        "Ho Chi Minh": ["District 1", "District 2", "District 3", "District 4"],
        "DaNang": ["HaiChau", "ThanhKhe", "CamLe"],
        "QuangNam": ["TamKy", "HoiAn", "DienBan"],
        "HaNoi": ["HoanKiem", "BaDinh", "HaiBaTrung"]
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
            navigate(`/SelectYourSeat?selectedDate=${selectedDate}&selectedTime=${selectedTime}&selectedTicketType=${selectedTicketType}&selectedLocation=${selectedLocation}&selectedSubLocation=${selectedSubLocation}&movieSelectedId=${movieSelectedId}`);
        }
    };
    
    const handleTypeSelect = (type) => {
        setSelectedType(type);
    };

    useEffect(() => {
        const timeSelection = document.querySelector('.time-selection');
        if (timeSelection) {
            timeSelection.classList.add('show');
        }
    }, []);

    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieSelectedId, setMovieSelectedId] = useState(null);
    // Take id from URL 
    useEffect(() => {
        const pathname = window.location.pathname;
        const pathParts = pathname.split('/');
        const movieId = pathParts[pathParts.length - 1];

        console.log('Selected Movie ID:', movieId);
        setMovieSelectedId(movieId);
        movieService.getMovieById(movieId)
        .then((res) => {
            if(res.data) {
                console.log("RES_1: ", res.data);
                setSelectedMovie(res.data);
            }
        })
        .catch((err) => {
            console.log("Can't get the ID")
        });

      }, []);

    //   take URL id save it to movieSelectedId
    useEffect(() => {
        if (movieSelectedId) {
            console.log('movieSelectedId: ', movieSelectedId);

            movieService.getMovieById(movieSelectedId)
                .then((res) => {
                    if (res.data) {
                        console.log("RES: ", res.data);
                        setSelectedMovie(res.data);
                    }
                })
                .catch((err) => {
                    console.log("Can't get the id from URL");
                });
        }
    }, [movieSelectedId]);
    
    

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

                        <div className="dropdown-location">
                            <DropdownItems items={locations} 
                            selectedItem={selectedLocation} 
                            handleItemClick={handleLocationSelect}
                            defaultText="SELECT A LOCATION" />
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

                        

                        {selectedLocation && (
                            <div className="dropdown-sublocation">
                                <DropdownItems items={locationsData[selectedLocation] || []} 
                                selectedItem={selectedSubLocation} 
                                handleItemClick={handleSubLocationSelect} 
                                defaultText="SELECT Cinema Location"/>
                            </div>
                        )}

                        {/* Ticket Type Selection */}
                        <div className="ticket-type-selection">
                            <h2>Select Ticket Type</h2>
                            <div className="selectTicketTypeContainer">
                            <div className="radio-group">
                                <div className="radio-item"
                                    
                                >
                                    <input
                                        type="radio"
                                        id="regular2d"
                                        name="ticketType"
                                        value="REGULAR2D"
                                        checked={selectedTicketType === 'REGULAR2D'}
                                        onChange={() => {
                                            handleTicketTypeSelect('REGULAR2D');
                                            handleTypeSelect('REGULAR2D'); // Gọi hàm xử lý mới để cập nhật loại vé được chọn
                                        }}
                                    />
                                    <label htmlFor="regular2d" className={selectedType === 'REGULAR2D' ? 'ticketTypeSelector active' : 'ticketTypeSelector'}>Regular 2D</label>
                                </div>
                                <div className="radio-item">
                                    <input
                                        type="radio"
                                        id="goldClass2d"
                                        name="ticketType"
                                        value="GOLDCLASS2D"
                                        checked={selectedTicketType === 'GOLDCLASS2D'}
                                        onChange={() => {
                                            handleTicketTypeSelect('GOLDCLASS2D');
                                            handleTypeSelect('GOLDCLASS2D');
                                        }}
                                    />
                                    <label htmlFor="goldClass2d" className={selectedType === 'GOLDCLASS2D' ? 'ticketTypeSelector active' : 'ticketTypeSelector'}>Gold Class 2D</label>
                                </div>
                                <div className="radio-item">
                                    <input
                                        type="radio"
                                        id="velvet2d"
                                        name="ticketType"
                                        value="VELVET2D"
                                        checked={selectedTicketType === 'VELVET2D'}
                                        onChange={() => {
                                            handleTicketTypeSelect('VELVET2D');
                                            handleTypeSelect('VELVET2D');
                                        }}
                                    />
                                    <label htmlFor="velvet2d" className={selectedType === 'VELVET2D' ? 'ticketTypeSelector active' : 'ticketTypeSelector'}>Velvet 2D</label>
                                </div>
                            </div>
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
            
                                {selectedMovie && (<div className="col-2">
                                    <div className="chosen-movie-info">
                                        <div className="movie-img">
                                            <img src={selectedMovie.posterUrl} alt="" />
                                        </div>
                                        <div className="movie-title">
                                            <h1 className="title">{selectedMovie.title}</h1>
                                            <div className="more-info">
                                                <div className="col-1">
                                                    <span className="child-1 title">Genre</span>
                                                    <span className="child-2 title">Duration</span>
                                                    <span className="child-3 title">Director</span>
                                                    <span className="child-4 title">Age Rating</span>
                                                </div>
                                                <div className="col-2">
                                                    <span className="Genre">Action</span>
                                                    <span className="Duration">{selectedMovie.duration} minutes</span>
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
                                                            {selectedSubLocation ? selectedSubLocation : "Default Sublocation"}
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
                                                <button className="BUYNOWButton" onClick={handleBuyNow}><span>BUY NOW</span></button>
                                            </div>
                                        </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                    <div className="footer-bookingticket"></div>
                </div>
            );
            };
            
            export default BookingMoviePage;
            
