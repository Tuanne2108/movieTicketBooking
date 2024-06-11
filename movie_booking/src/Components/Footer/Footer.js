import React from 'react'
import { useNavigate } from 'react-router';
import CNEMA from '../Assets/CNEMA.png';

import './styleFooter.css';

const Footer = () => {
    const navigate = useNavigate();
  return (
    <div className='footerCnema'>
        <div className='footerContainer'>
            <div className='colu col_1'>
                <img src={CNEMA} />
            </div>
            <div className='colu col_2'>
                <div className='content'>
                    <h5>Company</h5>
                    <span>Contact us</span>
                    <span>About</span>
                    <span>Partner</span>
                </div>
                <div className='content'>
                    <h5>About</h5>
                    <span>FRESHMEN</span>
                    <span>Cinema</span>
                    <span>My Ticket</span>
                    <span>Payment</span>
                    <span>Installment</span>
                </div>
                <div className='content'>
                    <h5>Support</h5>
                    <span>Tuan Nguyen</span>
                    <span>Tran Thuan</span>
                    <span>Tan Anh</span>
                    <span>Cd MV</span>
                    <span>Update Covid-19</span>
                </div>
            </div>
            <div className='colu col_3'>
                <div className='content'>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer