import React from 'react';
import './styleCustomSeat.css';

const CustomSeat = ({ items, selectedSeats, onSeatSelect, itemsPerRow }) => {
    const handleSeatClick = (seatNumber, seatStatus) => {
        console.log("Seat number:", seatNumber);
        console.log("Seat status:", seatStatus);
        console.log("Selected seats:", selectedSeats);
        
        if (seatStatus === 'booked') {
            // Không làm gì khi ghế đã được đặt
            return;
        }
        // Kiểm tra xem ghế đã được chọn chưa
        const isSelected = selectedSeats.includes(seatNumber);
        // Nếu đã được chọn, bỏ chọn ghế đó
        if (isSelected) {
            const updatedSelectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
            onSeatSelect(updatedSelectedSeats);
        } else {
            // Thêm ghế vào danh sách nếu chưa được chọn
            const updatedSelectedSeats = [...selectedSeats, seatNumber];
            onSeatSelect(updatedSelectedSeats);
        }
    };
    


    return (
        <div className="custom-list">
            {items.map((seat, index) => (
                <div 
                    key={index} 
                    className={`seat-item ${seat.status === 'booked' ? 'booked' : ''} ${selectedSeats.includes(seat.seatNumber) ? 'active' : ''}`}
                    onClick={() => handleSeatClick(seat.seatNumber, seat.status)} // Kiểm tra xem đây có phải là hàm handleSeatClick
                    style={{ flexBasis: `calc(100% / ${itemsPerRow})` }}
                >
                    <div className={`list-child ${seat.status === 'booked' ? 'disabled' : ''}`}>
                        <span>{seat.seatNumber}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomSeat;
