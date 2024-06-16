import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Slider from '../../Components/SliderItems/Slider';
import DropdownItems from '../../Components/DropdownItems/DropdownItems_Booking';
import * as movieService from "../../services/MovieService";
import * as movieInfo from "../../services/ShowService";
import * as theaterInfo from "../../services/TheaterService";
import MapA from '../../Components/Maps/MapA';


import './BookingMoviePage.css';

const BookingMoviePage = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedTicketType, setSelectedTicketType] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movieSelectedId, setMovieSelectedId] = useState(null);
    const [shows, setShows] = useState([]);
    const [filteredShows, setFilteredShows] = useState([]);
    const [availableDates, setAvailableDates] = useState([]);
    const [showTheaters, setShowTheaters] = useState([]);
    const [availableTicketTypes, setAvailableTicketTypes] = useState([]);
    const [filteredShowsByDate, setFilteredShowsByDate] = useState([]);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [filteredShowByTime, setFilteredShowByTime] = useState([]);
    const [filteredShowByTicketType, setFilteredShowByTicketType] = useState([]);
    const [availableSeats, setAvailableSeats] = useState([]);
    const [ticketPrice, setTicketPrice] =  useState([]);
    const [filterTicketPrice, setFilterTicketPrice] = useState([]);

    // Fetch movie ID from URL and get movie details
    useEffect(() => {
        const pathname = window.location.pathname;
        const pathParts = pathname.split('/');
        const movieId = pathParts[pathParts.length - 1];

        setMovieSelectedId(movieId);

        movieService.getMovieById(movieId)
            .then((res) => {
                if (res.data) {
                    setSelectedMovie(res.data);
                    setMovieSelectedId(movieId);
                }
            })
            .catch((err) => {
                console.log("Can't get the ID", err);
            });
    }, []);

    // Fetch all shows
    useEffect(() => {
        movieInfo.getAllShows()
            .then((res1) => {
                if (res1.data) {
                    setShows(res1.data);
                }
            })
            .catch((err) => {
                console.log("Error fetching shows", err);
            });
    }, []);
    // useEffect(() => {
    //     console.log(movieSelectedId);
    // });
    // Filter shows based on selected movie
    useEffect(() => {
        if (movieSelectedId && Array.isArray(shows)) {
            const filteredShowsChosen = shows.filter(show => show && show.movie._id === movieSelectedId);
            setFilteredShows(filteredShowsChosen);
        }
    }, [shows, movieSelectedId]);

    // Get available dates based on location
    useEffect(() => {
        if (selectedLocation && Array.isArray(filteredShows)) {
            const filterDayShows = filteredShows.filter(show => show && show.theater.location === selectedLocation);
            const dates = filterDayShows.map(show => new Date(show.date).toLocaleDateString());
            setAvailableDates([...new Set(dates)]); // Ensure dates are unique
            // console.log(selectedLocation);
        }
    }, [filteredShows, selectedLocation]);

    // Fetch all theaters
    useEffect(() => {
        theaterInfo.getAllTheaters()
            .then((resTheater) => {
                if (resTheater.data) {
                    setShowTheaters(resTheater.data);
                }
            })
            .catch((err) => {
                console.log("Error fetching theaters", err);
            });
    }, []);

    // Filter shows by date and location to get available ticket types
    useEffect(() => {
        if (selectedDate) {
            const filterDayShows = filteredShows.filter(show =>
                show &&
                show.theater.location === selectedLocation &&
                new Date(show.date).toLocaleDateString() === selectedDate
            );
            setFilteredShowsByDate(filterDayShows);
            // console.log(selectedLocation);
            const ticketTypes = filterDayShows.map(show => show.typeOfTicket);
            setAvailableTicketTypes([...new Set(ticketTypes)]);
        }
    }, [filteredShows, selectedDate, selectedLocation]);

    useEffect(() => {
        if(selectedTicketType) {
            const filterPriceShows = filteredShows.filter(show =>
                show &&
                show.theater.location === selectedLocation &&
                new Date(show.date).toLocaleDateString() === selectedDate &&
                show.typeOfTicket === selectedTicketType
            );
            setFilterTicketPrice(filterPriceShows);

            const price = filterPriceShows.map(show => show.price);
            // console.log(price);
            setTicketPrice([...new Set(price)]);
        }
    }, [filteredShows, selectedDate, selectedLocation, selectedTicketType])
    // useEffect(() => {
    //     console.log('price: ', ticketPrice);
    // });
    // Filter shows by TicketTypes and location to get available time
    useEffect(() => {
        if (availableTicketTypes) {
            const filterTicketTypeShows = filteredShows.filter(show =>
                show &&
                show.theater.location === selectedLocation &&
                new Date(show.date).toLocaleDateString() === selectedDate &&
                show.typeOfTicket === selectedTicketType
            );
            setFilteredShowByTicketType(filterTicketTypeShows);

            const time = filterTicketTypeShows.map(show => show.time);
            // console.log('time: ', time);
            setAvailableTimes([...new Set(time)]);
        }
    }, [filteredShows, selectedDate, selectedLocation, selectedTicketType]);
    
    // Filter shows by time and location to get available seats
    useEffect(() => {
        if (availableTimes) {
            const filterTimeShows = filteredShows.filter(show =>
                show &&
                show.theater.location === selectedLocation &&
                new Date(show.date).toLocaleDateString() === selectedDate &&
                show.typeOfTicket === selectedTicketType &&
                show.time === selectedTime
            );
            setFilteredShowByTime(filterTimeShows);
            const seat = filterTimeShows.map(show => show.seat);
            
            setAvailableSeats([...new Set(seat)]);
        }
    }, [filteredShows, selectedDate, selectedLocation, selectedTicketType, selectedTime]);
    
    
    

    // Filter shows by time to get available seats
    // useEffect(() => {
    //     if (availableTimes) {
    //         const filteredShows = filteredShowByTicketType.filter(show =>
    //             show && 
    //             show.theater.location === selectedLocation &&
    //             new Date(show.date).toLocaleDateString() === selectedDate &&
    //             show.typeOfTicket === selectedTicketType &&
    //             show.time === selectedTime
    //         );

    //         console.log('filteredShows: ', filteredShows);

    //         if (Array.isArray(filteredShows) && filteredShows.length > 0) {
    //             const seats = filteredShows.flatMap(show => show.seats || []);
    //             console.log('Seats:', seats);
    //             setAvailableSeats([...new Set(seats)]);
    //         } else {
    //             console.log('No shows available for the selected criteria');
    //             setAvailableSeats([]); // Set to empty array if no shows match the criteria
    //         }
    //     }
    // }, [filteredShowByTicketType, selectedDate

    const handleTimeSelect = (time) => {
        setSelectedTime(time);
    };

    const handleSeatsSelect = (index) => {
        if (selectedSeats.includes(index)) {
          setSelectedSeats(selectedSeats.filter(seat => seat !== index));
        } else {
          setSelectedSeats([...selectedSeats, index]);
        }
      };
    const handleSeatSelect = (seatNumber, seatStatus) => {
        if (seatStatus === 'booked') {
            // Không cập nhật selectedSeats nếu ghế đã được đặt
            return;
        }
        if (selectedSeats.includes(seatNumber)) {
            // Xóa ghế khỏi danh sách nếu đã được chọn trước đó
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
        } else {
            // Thêm ghế vào danh sách nếu chưa được chọn
            setSelectedSeats([...selectedSeats, seatNumber]);
        }
    };
    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
    };

    const handleTicketTypeSelect = (type) => {
        setSelectedTicketType(type);
    };

    const handleBuyNow = () => {
        if (!selectedDate || !selectedLocation || !selectedTicketType || !selectedTime) {
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        } else {
            navigate(`/Payment?selectedDate=${selectedDate}&selectedTime=${selectedTime}&selectedTicketType=${selectedTicketType}&selectedLocation=${selectedLocation}&movieSelectedId=${movieSelectedId}&selectedSeats=${selectedSeats}&price=${ticketPrice}`);
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
                            <DropdownItems items={showTheaters.map(theater => theater.location)}
                                selectedItem={selectedLocation}
                                handleItemClick={handleLocationSelect}
                                defaultText="SELECT A LOCATION" />
                        </div>

                        <div className="date-available-slider">
                            <Slider slidesToShow={5} slidesToScroll={5}>
                                {availableDates.map((date, index) => (
                                    <div key={index} className={`DateAvailable ${selectedDate === date ? 'active' : ''}`}>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="movieDate"
                                                id={`movieDate${index}`}
                                                value={date}
                                                checked={selectedDate === date}
                                                onChange={() => handleDateSelect(date)}
                                            />
                                            <label className="form-check-label" htmlFor={`movieDate${index}`}>
                                                <div className="date-month">
                                                    <span>{date}</span>
                                                    <h3>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}</h3>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>

                        <div className="ticket-type-selection">
                            <h4>Choose Ticket Type</h4>
                            <ul>
                                {availableTicketTypes.map((type, index) => (<li key={index}>
                                    <button
                                        className={`ticket-type-button ${selectedTicketType === type ? 'active' : ''}`}
                                        onClick={() => handleTicketTypeSelect(type)}
                                    >
                                        {type}
                                    </button>
                                </li>
                                ))}
                            </ul>
                        </div>

                        <div className="time-selection">
                            <div className="title">
                                <h1>SELECT YOUR SEAT</h1>
                                <span>Choose the seats you want to reserve</span>
                            </div>
                            <ul>
                                {availableTimes.map((time, index) => (
                                    <li key={index}>
                                        <button
                                            className={`time-button ${selectedTime === time ? 'active' : ''}`}
                                            onClick={() => handleTimeSelect(time)}
                                        >
                                            {time}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="seat-selection">
                            <div className="seat-area">
                                

                            </div>
                            <h2>Select Seats</h2>
                            <ul>
                                {availableSeats.map((seat, index) => (
                                    <li key={index}>
                                        <button
                                            className={`seat-button ${selectedSeats === seat ? 'active' : ''}`}
                                            onClick={() => handleSeatsSelect(seat)}
                                        >
                                            {seat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {selectedMovie && (
                        <div className="col-2">
                            <div className="chosen-movie-info">
                                <div className="movie-img">
                                    <img src={selectedMovie.posterUrl} alt={selectedMovie.title} />
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
                                            <span className="Genre">{selectedMovie.genre}</span>
                                            <span className="Duration">{selectedMovie.duration} minutes</span>
                                            <span className="Director">{selectedMovie.director}</span>
                                            <span className="Age Rating">{selectedMovie.ageRating}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="movie-demoTicket">
                                    <div className="ticket-info container-1">
                                        {selectedLocation && (
                                            <div className="locationChosen-CityDistrict">
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
                                                {selectedTime} ({selectedTicketType})
                                            </span>
                                        )}
                                        {selectedSeats && (
                                            <span className='child-4 seats'>
                                                {selectedSeats.join(', ')}
                                            </span>
                                        )}
                                    </div>
                                    <div className="note-buttonBuyNow container-2">
                                        <span><i>* Seat selection can be made later</i></span>
                                        <button className="BUYNOWButton" onClick={handleBuyNow}><span>BUY NOW</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="footer-bookingticket"></div>
        </div>
    );
};

export default BookingMoviePage;
