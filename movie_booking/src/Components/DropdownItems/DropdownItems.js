import React, { useState, useEffect, useRef } from 'react';
import './styleDropdownItems.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const DropdownItems = ({ items, selectedItem, handleItemClick, defaultText }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const buttonRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleItemClickWrapper = (item) => {
        handleItemClick(item);
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    return (
        <div className="dropdown-loca">
            <div className="loca-container">
                <div className="dropdown">
                <button
                    ref={buttonRef}
                    className={`button-dropdown ${isDropdownOpen ? '' : 'show'}`}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded={isDropdownOpen}
                    onClick={toggleDropdown}
                >
                    {selectedItem || defaultText}
                    <FontAwesomeIcon icon={isDropdownOpen ? faChevronUp : faChevronDown} />
                </button>

                    <ul className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                        {items.map((item, index) => (
                            <li key={index}>
                                <button className="dropdown-item" onClick={() => handleItemClickWrapper(item)}>
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
