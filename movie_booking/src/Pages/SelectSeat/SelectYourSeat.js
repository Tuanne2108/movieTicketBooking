import React from 'react';
import { useLocation } from 'react-router-dom';

const SelectYourSeat = () => {
    const location = useLocation();
    const selectedTime = new URLSearchParams(location.search).get('selectedTime');
    const selectedDate = new URLSearchParams(location.search).get('selectedDate');
    const selectedTicketType = new URLSearchParams(location.search).get('selectedTicketType');

    return (
        <div>
            <h1>SELECT A SEAT</h1>
            <span>Choose the seat you will occupy during the film screening</span>
            <div className="timeSelected">
                <h2>{selectedTime}</h2>
            </div>
            
            {/* Các dòng mã khác */}
        </div>
    );
};

export default SelectYourSeat;
