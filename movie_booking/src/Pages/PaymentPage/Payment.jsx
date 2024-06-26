import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './stylePayment.css';
import * as movieService from "../../services/MovieService";
import * as emailService from "../../services/EmailService";
import * as showService from "../../services/ShowService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const Payment = () => {
    const location = useLocation();
    const selectedDate = new URLSearchParams(location.search).get('selectedDate');
    const selectedTime = new URLSearchParams(location.search).get('selectedTime');
    const selectedTicketType = new URLSearchParams(location.search).get('selectedTicketType');
    const selectedLocation = new URLSearchParams(location.search).get('selectedLocation');
    const selectedSeats = new URLSearchParams(location.search).get('selectedSeats').split(',');
    const selectedMovieId = new URLSearchParams(location.search).get('movieSelectedId');
    const ticketPrice = parseFloat(new URLSearchParams(location.search).get('price'));

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const totalTickets = selectedSeats.length;
    const totalPriceTicket = totalTickets * ticketPrice;
    const serviceFeePerTicket = 3000;
    const servicefeeTotal = serviceFeePerTicket * totalTickets;
    const promoVoucher = 0;
    const totalPrice = totalPriceTicket + servicefeeTotal - promoVoucher;

    const [selectedMovie, setSelectedMovie] = useState(null);
    useEffect(() => {
        movieService.getMovieById(selectedMovieId)
            .then((res) => {
                if (res.data) {
                    setSelectedMovie(res.data);
                }
            })
            .catch((err) => {
                console.log("Error fetching movie details:", err);
            });
    }, [selectedMovieId]);

    const [showsSeat, setShowsSeat] = useState(null);

    useEffect(() => {
        showService.getAllShows()
            .then((res) => {
                if (res.data) {
                    setShowsSeat(res.data);
                }
            })
            .catch((err) => {
                console.log("Error fetching shows:", err);
            });
    }, []);
    const [selectedSeatIds, setSelectedSeatIds] = useState([]);
    useEffect(() => {
        // Kiểm tra điều kiện trước khi cập nhật selectedSeatIds
        if (showsSeat && selectedSeats.length > 0) {
            const matchedSeats = showsSeat.filter(show => selectedSeats.includes(show.seat));
            const seatIds = matchedSeats.map(show => show._id);
    
            // Kiểm tra xem selectedSeatIds có thay đổi mới cập nhật
            if (JSON.stringify(seatIds) !== JSON.stringify(selectedSeatIds)) {
                setSelectedSeatIds(seatIds);
            }
        }
    }, [showsSeat, selectedSeats]);
    
    const seatIdsString = selectedSeatIds.join(',');
    useEffect(() => {
        console.log('selectedSeatIds: ', selectedSeatIds.length)
    }, [selectedSeatIds]);
    

    const returnPreviousPage = () => {
        window.history.back();
    };

    const handleChangeStatusTicket = async () => {
        try {
            for (const seatId of selectedSeatIds) {
                const updateShow = {
                    status: false
                };
    
                const response = await axios.put(`http://localhost:4001/api/show/update-show/${seatId}/`, updateShow);
    
                if (response.data && response.data.message === 'Booking successful') {
                    // Handle success
                } else {
                    // Handle failure
                    setMessage(`Failed to book seat ${seatId}.`);
                    console.error(`Failed to book seat ${seatId}:`, response.data.error);
                }
            }
        } catch (error) {
            console.error("Failed to book seats:", error);
            setMessage("Failed to book seats. Please try again later.");
        }
    };
    const handleBuyTickets = async () => {
    if (!fullName || !email || !paymentMethod) {
        alert('Please fill out all fields before proceeding.');
        return;
    }

    const bookingData = {
        fullName,
        email,
        paymentMethod,
        seatIdsString,
        // Add other relevant data here if needed
    };

    try {
        // Create email data with selectedSeatIds
        const emailData = {
            fullName,
            email,
            paymentMethod,
            selectedSeatIds, // Include selectedSeatIds here
            subject: "Ticket Purchase Confirmation",
            body: `
                Hello ${fullName},
                Thank you for purchasing tickets!
                Seats: ${selectedSeatIds.join(', ')}
                // Include other details as needed
            `
        };
        
        await emailService.createMail(emailData);

        // Update ticket status and navigate to checkout page
        handleChangeStatusTicket();
        navigate('/Checkout');
    } catch (error) {
        console.error("Failed to send email:", error);
        alert("Failed to send email. Please try again later.");
    }
};

    
    
    
    

    return (
        <div className="Payment_Container">
            <div className="Payment_Section">
                <div className="col_0">
                    <button className='returnPrevPage' onClick={returnPreviousPage}>
                        <FontAwesomeIcon icon={faArrowLeft} />RETURN
                    </button>
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
                            <div className="mb-3">
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
                            {message && <div className="alert alert-info mt-3">{message}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
