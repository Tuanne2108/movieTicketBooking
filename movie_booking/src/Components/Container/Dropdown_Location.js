import React, {useState} from 'react'




const Dropdown_Location = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    const items = ["Ho Chi Minh", "Da Nang", "Quang Nam"];

    const handleItemClick = (item) => {
        setSelectedItem(item);
    };
  return (
    <div className="dropdown-loca">
        <div className="container">
            <div class="dropdown">
                <button class="button-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {selectedItem || "Location"}
                </button>
                <ul class="dropdown-menu">
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

    
  )
}

export default Dropdown_Location