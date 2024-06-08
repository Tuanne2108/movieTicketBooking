import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './stylePayment.css';
import * as movieService from "../../services/MovieService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Payment = () => {
    const location = useLocation();
    const selectedDate = new URLSearchParams(location.search).get('selectedDate');
    const selectedTime = new URLSearchParams(location.search).get('selectedTime');
    const selectedTicketType = new URLSearchParams(location.search).get('selectedTicketType');
    const selectedLocation = new URLSearchParams(location.search).get('selectedLocation');
    const selectedSublocation = new URLSearchParams(location.search).get('selectedSubLocation');
    const selectedSeats = JSON.parse(new URLSearchParams(location.search).get('selectedSeats'));
    const selectedMovieId = new URLSearchParams(location.search).get('selectedMovieId');
    // Giá tiền cho loại vé REGULAR2D
    const ticketPrice = {
      REGULAR2D: 55000,
      GOLDCLASS2D: 100000,
      VELVET2D: 110000
    };

    // Tính tổng số lượng vé đã chọn
    const totalTickets = selectedSeats.length;

    // Tính tổng số tiền cần phải trả
    const totalPriceTicket = totalTickets * ticketPrice[selectedTicketType];
    const serviceFeePerTicket = 3000;
    const servicefeeTotal = serviceFeePerTicket * totalTickets;
    const promoVoucher = 0;
    
    const totalPrice = totalPriceTicket + servicefeeTotal - promoVoucher;
    
    
    // take info base on id from url
    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        movieService.getMovieById(selectedMovieId)
        .then((res) => {
            if(res.data) {
                setSelectedMovie(res.data);
            }
        })
        .catch((err) => {
            console.log("Can't get the ID")
        }, [selectedMovieId]);
    });

    const returnPreviousPage = () => {
        window.history.back();
    };

    return (
        <div className="Payment_Container">
            <div className="Payment_Section">
                <div className="col_0">
                    <button className='returnPrevPage' onClick={returnPreviousPage}><FontAwesomeIcon icon={ faArrowLeft } />RETURN</button>
                </div>
                <div className="col_1">
                    <h1>PAYMENT CONFIRMATION</h1>
                    <span>Confirm payment for the seats you ordered</span>
                    <h2>Schedule Details</h2>

                    {selectedMovie && (
                        <div className="Payment_movieInfo">
                            <div className="movie_title"><span>Movie title</span>
                                <h3>{selectedMovie.title}</h3>
                            </div>
                            <div className="movie_Date"><span>Date:</span>
                                <h3>{selectedDate}</h3>
                            </div>
                            <div className="movie_Time"><span>Time:</span>
                                <h3>{selectedTime}</h3>
                            </div>

                            <div className="movie_TicketType"><span>Ticket Type:</span>
                                <h3>{selectedTicketType}</h3>
                            </div>

                            <div className="movie_Location"><span>Location:</span>
                                <h3>{selectedLocation}</h3>
                            </div>

                            <div className="movie_Sublocation"><span>Sublocation:</span>
                                <h3>{selectedSublocation}</h3>
                            </div>

                            <div className="movie_SelectedSeats"><span>Selected Seats: ({totalTickets})</span>
                                <h3>{selectedSeats.join(', ')}</h3>
                            </div>
                        </div>
                    )}
                    
                </div>
                <div className="col-2">
                    <h1 className='Order_Title'>Order Summary</h1>
                    <div className="TransactionDetails"> 
                        <h4>Transaction Details</h4>
                        <span>REGULAR SEAT: <p>{ticketPrice[selectedTicketType]}<p className='totalTicket'>*{totalTickets}</p></p></span>
                        <span>SERVICE FEES: <p>{serviceFeePerTicket} <p className='totalTicket'>*{totalTickets}</p></p></span>

                        
                    </div>
                    <div className='PROMO_FRESHMEN'>
                        <h4>Transaction Details</h4>
                        <span>PROMO FRESHMEN: <p>{promoVoucher}</p></span>
                    </div>

                    <div className='TOTAL_PAYMENT'>
                        <span className='BoldText'>Total Pay: <p>{totalPrice} VND</p></span>
                    </div>
                    <button className='BuyTicketButton'><span>BUY TICKETS</span></button>

                </div>
            </div>
            
            
        </div>
    );
};

export default Payment;
