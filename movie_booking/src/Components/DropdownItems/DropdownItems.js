// DropdownItems.js
import React from 'react';
import './styleDropdownItems.css';

const DropdownItems = ({ items, selectedItem, handleItemClick }) => {
    return (
        <div className="dropdown-loca">
            <div className="loca-container">
                <div className="dropdown">
                    <button className="button-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {selectedItem || "Select"}
                    </button>
                    <ul className="dropdown-menu">
                        {items.map((item, index) => (
                            <li key={index}>
                                <button className="dropdown-item" onClick={() => handleItemClick(item)}>
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DropdownItems;
