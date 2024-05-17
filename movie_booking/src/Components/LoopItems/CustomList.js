// src/Components/CustomList/CustomList.js

import React from 'react';
import './styleCustomList.css';

const CustomList = ({ items, selectedTime, onTimeSelect, ticketType }) => {
    return (
        <div className="custom-list">
            {items.map((time, index) => (
                <div 
                    key={index} 
                    className={`time-item ${selectedTime === time && ticketType ? 'active' : ''}`}
                    onClick={() => onTimeSelect(time, ticketType)}
                >
                    <span>{time}</span>
                </div>
            ))}
        </div>
    );
};

export default CustomList;
