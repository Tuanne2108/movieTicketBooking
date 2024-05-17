// src/Components/CustomList/CustomList.js

import React from 'react';
import './styleCustomList.css';

const CustomList = ({ items, selectedTime, onTimeSelect, ticketType, itemsPerRow }) => {
    return (
        <div className="custom-list">
            {items.map((time, index) => (
                <div 
                    key={index} 
                    className={`time-item ${selectedTime === time && ticketType ? 'active' : ''}`}
                    onClick={() => onTimeSelect(time, ticketType)}
                    style={{ flexBasis: `calc(100% / ${itemsPerRow})` }}
                >
                    <span>{time}</span>
                </div>
            ))}
        </div>
    );
};

CustomList.defaultProps = {
    itemsPerRow: 4
};

export default CustomList;