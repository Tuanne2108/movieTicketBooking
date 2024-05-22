import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import MapA from '../../Components/Map/MapA';
import './styleSelectYourSeat.css';

const SelectYourSeat = () => {
    const location = useLocation();
    const selectedTime = new URLSearchParams(location.search).get('selectedTime');
    // const ticketPrice = parseInt(new URLSearchParams(location.search).get('formattedPrice').replace(/[^0-9]/g, ''), 10);
    
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
    

    return (
        <div className="select-your-seat">
            <div className="selectYourSeatContainer">
                <h1>SELECT A SEAT</h1>
                <span>Choose the seat you will occupy during the film screening</span>
                <div className="time-selected">
                    <h2>{selectedTime}</h2>
                </div>
                
                <div className="seat-area">
                    <MapA selectedSeats={selectedSeats} onSeatSelect={handleSeatSelect} seatStatus={true} />

                </div>
            </div>
            
            {/* Hiển thị giá trị selectedSeats */}

            
        </div>
    );
};

export default SelectYourSeat;
