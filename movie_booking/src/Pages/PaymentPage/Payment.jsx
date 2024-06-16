import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './stylePayment.css';
import * as movieService from "../../services/MovieService";
import * as showService from "../../services/ShowService";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Payment = () => {
    const location = useLocation();
    const selectedDate = new URLSearchParams(location.search).get('selectedDate');
    const selectedTime = new URLSearchParams(location.search).get('selectedTime');
    const selectedTicketType = new URLSearchParams(location.search).get('selectedTicketType');
    const selectedLocation = new URLSearchParams(location.search).get('selectedLocation');

    const selectedSeats = new URLSearchParams(location.search).get('selectedSeats').split(',');
    const selectedMovieId = new URLSearchParams(location.search).get('movieSelectedId');


    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();

    // Giá tiền cho loại vé
    const ticketPrice = new URLSearchParams(location.search).get('price');

    // Tính tổng số lượng vé đã chọn
    const totalTickets = selectedSeats.length;

    // Tính tổng số tiền cần phải trả
    const totalPriceTicket = totalTickets * ticketPrice;
    const serviceFeePerTicket = 3000;
    const servicefeeTotal = serviceFeePerTicket * totalTickets;
    const promoVoucher = 0;

    const totalPrice = totalPriceTicket + servicefeeTotal - promoVoucher;

    // Lấy thông tin phim dựa trên ID từ URL
    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        movieService.getMovieById(selectedMovieId)
            .then((res) => {
                if (res.data) {
                    setSelectedMovie(res.data);
                }
            })
            .catch((err) => {
                console.log("Can't get the ID");
            });
    }, [selectedMovieId]);

    useEffect(() => {
        console.log('selectedSeats: ', ticketPrice);
        console.log('totalTickets: ', totalTickets);
    }, [selectedSeats, totalTickets]);

    const returnPreviousPage = () => {
        window.history.back();
    };

    const handleBuyTickets = () => {
        if (!fullName || !email || !paymentMethod) {
            alert('Please fill out all fields before proceeding.');
            return;
        }
        else {
            navigate('/Checkout');
        }
    };

    return (
        <div className="Payment_Container">
            <div className="Payment_Section">
                <div className="col_0">
                    <button className='returnPrevPage' onClick={returnPreviousPage}><FontAwesomeIcon icon={faArrowLeft} />RETURN</button>
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

                            <div className="movie_SelectedSeats"><span>Selected Seats: ({totalTickets})</span>
                                <h3>{selectedSeats.join(', ')}</h3>
                            </div>
                        </div>
                    )}
                </div>
                <div className="col-2">
                    <div className='section_1'>
                        <div id='formContainer'>
                            <div class="mb-3">
                            <input
                                className="form-control"
                                type="text"
                                placeholder="Your Full Name"
                                aria-label="default input example"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input
                                type="email"
                                className="form-control"
                                id="exampleFormControlInput1"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <option value="" disabled selected>Payment methods</option>
                                <option value="cash">Payment in cash</option>
                            </select>
                            </div>
                        </div>

                    </div>
                    <div className='section_2'>
                        <h1 className='Order_Title'>Order Summary</h1>
                        <div className='DetailInfo'>
                            <div className="TransactionDetails">
                                <h4>Transaction Details</h4>
                                <span>{selectedTicketType}: <p>{ticketPrice}<span className='totalTicket'>*{totalTickets}</span></p></span>
                                <span>SERVICE FEES: <p>{serviceFeePerTicket}<span className='totalTicket'>*{totalTickets}</span></p></span>
                            </div>
                            <div className='PROMO_FRESHMEN'>
                                <h4>Transaction Details</h4>
                                <span>PROMO FRESHMEN: <p>{promoVoucher}</p></span>
                            </div>
                            <div className='TOTAL_PAYMENT'>
                                <span className='BoldText'>Total Pay: <p>{totalPrice} VND</p></span>
                            </div>
                            <button id="BuyTicketButton" 
                            className='BuyTicketButton'
                            onClick={handleBuyTickets}>
                                <span>BUY TICKETS</span>
                                </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Payment;