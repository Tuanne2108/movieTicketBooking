import React from 'react'
import './Navbar.css'
import CNEMA from '../Assets/CNEMA.png'
import cart_icon from '../Assets/cart_icon.png'
const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navbar-container">
            <div className="nav-logo">
                <img src={CNEMA} alt =""/>
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
            <button>Login</button>

            </div>
        </div>
    </div>
  )
}

export default Navbar
