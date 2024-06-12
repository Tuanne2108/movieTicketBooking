import React, { useState, useEffect } from 'react';
import './styleMapA.css';
import CustomSeat from '../LoopItems/CustomSeat'; // Import CustomSeat component
import * as movieService from "../../services/MovieService";

const MapA = ({ selectedSeats, onSeatSelect, selectedMovieIdFromSelectYourSeat }) => {
    const [movieSelectedId, setMovieSelectedId] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [seatCol1FromData, setSeatCol1FromData] = useState([]);
    const [seatCol2FromData, setSeatCol2FromData] = useState([]);

    useEffect(() => {
        console.log('Selected Movie ID from MapA.js:', selectedMovieIdFromSelectYourSeat);
        setMovieSelectedId(selectedMovieIdFromSelectYourSeat);
        movieService.getMovieById(selectedMovieIdFromSelectYourSeat)
        .then((res) => {
            if(res.data) {
                console.log("RES_SelectYourSeat from MapA.js: ", res.data);
                setSelectedMovie(res.data);
                updateSeatsFromData(res.data.seats);
            }
        })
        .catch((err) => {
            console.log("Can't get the ID from MapA.js")
        });

      }, []);

    // useEffect(() => {
    //     if (selectedMovie && selectedMovie.seats) {
    //         console.log('seats: ', selectedMovie.seats);
    //         updateSeatsStatus(selectedMovie.seats);
    //     }
    //     else {
    //         console.log('fail to print seats array');
    //     }
    // }, [selectedMovie]);
    
    const updateSeatsFromData = (seatStatusArray) => {
        const col1 = [];
        const col2 = [];
        const seatsPerCol = 30; // assuming each column has 20 seats

        seatStatusArray.forEach((status, index) => {
            const seat = {
                seatNumber: getSeatNumber(index),
                status: status ? 'available' : 'booked'
            };
            if (index < seatsPerCol) {
                col1.push(seat);
            } else {
                col2.push(seat);
            }
        });

        setSeatCol1FromData(col1);
        setSeatCol2FromData(col2);
    };

    const getSeatNumber = (index) => {
        const row = String.fromCharCode(65 + Math.floor(index / 10)); // A, B, C, ...
        const number = (index % 10) + 1;
        return row + number;
    };

  
      return (
        <div className="mapA">
            <div className="mapA-col1">
                <CustomSeat 
                    items={seatCol1FromData} 
                    selectedSeats={selectedSeats} 
                    onSeatSelect={onSeatSelect} 
                    itemsPerRow={10} 
                />
            </div>
            <div className="mapA-col2">
                <CustomSeat 
                    items={seatCol2FromData} 
                    selectedSeats={selectedSeats} 
                    onSeatSelect={onSeatSelect} 
                    itemsPerRow={10} 
                />
            </div>
        </div>
    );
};

export default MapA;
