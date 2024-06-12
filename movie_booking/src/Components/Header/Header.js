import React from 'react'
import CNEMA from '../Assets/CNEMA.png'
import { useNavigate } from "react-router-dom";

import './styleHeader.css'

const Header = () => {
  const navigate = useNavigate();
  const handleClickLogo = () => {
    navigate('/')
  }


  return (
    <div className="navbar">
        <div className="navbar-container">
            <div className="nav-logo">
                <img src={CNEMA} alt ="" onClick={handleClickLogo}/>
            </div>
            <div className="nav-menu">
              <ul className="ul-nav-menu">
                  <li><a href="#">Movies</a></li>
                  <li><a href="#">News</a></li>
                  <li><a href="#">Actors</a></li>
                  <li><a href="#">More</a></li>
              </ul>
            </div>
            

            <div className="nav-login-button">
            <button><a href='/sign-in'>Login</a></button>

            </div>
        </div>
    </div>
  )
}

export default Header