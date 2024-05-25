// CustomSeat.js
import React from 'react';
import './styleCustomSeat.css';

const CustomSeat = ({ items, selectedSeats, onSeatSelect, itemsPerRow }) => {
    return (
        <div className="custom-list">
            {items.map((seat, index) => (
                <div 
                    key={index} 
                    className={`seat-item ${selectedSeats.includes(seat.seatNumber) ? 'active' : ''}`}
                    onClick={() => onSeatSelect(seat.seatNumber, seat.status)}
                    style={{ flexBasis: `calc(100% / ${itemsPerRow})` }}>
                    <div className={`list-child ${seat.status === 'booked' ? 'booked' : ''}`}>
                        <span>{seat.seatNumber}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CustomSeat;