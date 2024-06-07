// SelectYourSeat.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MapA from '../../Components/Maps/MapA';
import './styleSelectYourSeat.css';

const SelectYourSeat = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const selectedTime = new URLSearchParams(location.search).get('selectedTime');
    const selectedDate = new URLSearchParams(location.search).get('selectedDate');
    const selectedLocation = new URLSearchParams(location.search).get('selectedLocation');
    const selectedSubLocation = new URLSearchParams(location.search).get('selectedSubLocation');
    const selectedTicketType = new URLSearchParams(location.search).get('selectedTicketType');
    const selectedMovieId = new URLSearchParams(location.search).get('movieSelectedId');
    
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

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

    const handleBooking = () => {
        if (selectedSeats.length < 1) {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000);
            return;
        }
        else {
            // Chuyển hướng sang trang ResultBooking với các thông tin đã chọn
            navigate(`/Payment?selectedDate=${selectedDate}&selectedTime=${selectedTime}&selectedTicketType=${selectedTicketType}&selectedLocation=${selectedLocation}&selectedSubLocation=${selectedSubLocation}&selectedSeats=${encodeURIComponent(JSON.stringify(selectedSeats))}&selectedMovieId=${selectedMovieId}`);
    
        }
    }

    const closePopup = () => {
        setShowPopup(false)
    }

    const returnPreviousPage = () => {
        window.history.back();
    };


    return (
        <div className="select-your-seat">
            <div className="selectYourSeatContainer">
                <h1>SELECT A SEAT</h1>
                
                <span>Choose the seat you will occupy during the film screening</span>
                <div className="time-selected">
                    <h2>{selectedTime}</h2>
                </div>
                
                <div className="seat-area">
                    <MapA selectedSeats={selectedSeats} onSeatSelect={handleSeatSelect} />
                </div>
                
                
            </div>
            <div className="screen">
                    <h1>Cinema Screen Here</h1>
                </div>
            <div className="otherthings">
                <span>Ticket Type: <p>{selectedTicketType}</p>  </span>
                <span>Sublocation:<p>{selectedSubLocation}</p> </span>
                <span>selectedSeats: <p>{selectedSeats}</p> </span>
                <div className="buttons">
                <button className="returnButton" onClick={returnPreviousPage}><span>RETURN</span></button>
                <button className="confirmButton" onClick={handleBooking}><span>CONFIRMATION</span></button>
                </div>
            </div>
            
            {showPopup && (
                <div className="select_your_seat_popup">
                    <div className="select_your_seat_popup_container">
                        <button className="close_button_select_your_seat_popup" onClick={closePopup}>X</button>
                        <span>Please select at least one seat.</span>
                        </div>
                </div>
            )}
        </div>
    );
};

export default SelectYourSeat;
