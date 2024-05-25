import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Payment = () => {
    const location = useLocation();
    const selectedDate = new URLSearchParams(location.search).get('selectedDate');
    const selectedTime = new URLSearchParams(location.search).get('selectedTime');
    const selectedTicketType = new URLSearchParams(location.search).get('selectedTicketType');
    const selectedLocation = new URLSearchParams(location.search).get('selectedLocation');
    const selectedSublocation = new URLSearchParams(location.search).get('selectedSubLocation');
    const selectedSeats = JSON.parse(new URLSearchParams(location.search).get('selectedSeats'));
    
    // Giá tiền cho loại vé REGULAR2D
    const ticketPrice = {
      REGULAR2D: 55000,
      GOLDCLASS2D: 100000,
      VELVET2D: 110000
    };

    // Tính tổng số lượng vé đã chọn
    const totalTickets = selectedSeats.length;

    // Tính tổng số tiền cần phải trả
    const totalPrice = totalTickets * ticketPrice[selectedTicketType];

    return (
        <div>
            <h1>Payment</h1>
            <p>Date: {selectedDate}</p>
            <p>Time: {selectedTime}</p>
            <p>Ticket Type: {selectedTicketType}</p>
            <p>Location: {selectedLocation}</p>
            <p>Sublocation: {selectedSublocation}</p>
            <p>Selected Seats: {selectedSeats.join(', ')} (Total: {totalTickets})</p>
            <p>Total Price: {totalPrice} VND</p>
        </div>
    );
};

export default Payment;
