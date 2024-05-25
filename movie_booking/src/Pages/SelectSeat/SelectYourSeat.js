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
    
    const [selectedSeats, setSelectedSeats] = useState([]);

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
        // Chuyển hướng sang trang ResultBooking với các thông tin đã chọn
        navigate(`/Payment?selectedDate=${selectedDate}&selectedTime=${selectedTime}&selectedTicketType=${selectedTicketType}&selectedLocation=${selectedLocation}&selectedSubLocation=${selectedSubLocation}&selectedSeats=${encodeURIComponent(JSON.stringify(selectedSeats))}`);
    }
    

    return (
        <div className="select-your-seat">
            <div className="selectYourSeatContainer">
                <h1>SELECT A SEAT</h1>
                <p>Date: {selectedDate}</p>
                <p>Time: {selectedTime}</p>
                <p>Ticket Type: {selectedTicketType}</p>
                <p>Location: {selectedLocation}</p>
                <p>Sublocation: {selectedSubLocation}</p>
                <p>selectedSeats: {selectedSeats}</p>
                <span>Choose the seat you will occupy during the film screening</span>
                <div className="time-selected">
                    <h2>{selectedTime}</h2>
                </div>
                
                <div className="seat-area">
                    <MapA selectedSeats={selectedSeats} onSeatSelect={handleSeatSelect} />
                </div>
                <button onClick={handleBooking}>Book Your Tickets</button>
            </div>
        </div>
    );
};

export default SelectYourSeat;
