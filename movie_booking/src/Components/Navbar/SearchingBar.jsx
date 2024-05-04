import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './SearchingBar.css';

const SearchingBar = () => {
  return (
    <div className="searchingbar-container">
      <div className="searching">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Searching film" aria-label="Searching film" aria-describedby="button-addon2" />
          <button class="btn btn-outline-secondary" type="button" id="button-addon2">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchingBar;
