import React, { useState, useEffect } from 'react';
import './styleMapA.css';
import CustomSeat from '../LoopItems/CustomSeat'; // Import CustomSeat component
import * as movieService from "../../services/MovieService";

const MapA = ({ selectedSeats, onSeatSelect, selectedMovieIdFromSelectYourSeat }) => {
    const [movieSelectedId, setMovieSelectedId] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        console.log('Selected Movie ID from MapA.js:', selectedMovieIdFromSelectYourSeat);
        setMovieSelectedId(selectedMovieIdFromSelectYourSeat);
        movieService.getMovieById(selectedMovieIdFromSelectYourSeat)
        .then((res) => {
            if(res.data) {
                console.log("RES_SelectYourSeat from MapA.js: ", res.data);
                setSelectedMovie(res.data);
            }
        })
        .catch((err) => {
            console.log("Can't get the ID from MapA.js")
        });

      }, []);

    useEffect(() => {
        if (movieSelectedId && movieSelectedId.seats) {
            console.log('seats: ', movieSelectedId.seats);
        }
        else {
            console.log('fail to print seats array');
        }
    }, [movieSelectedId]);
    

    const seatsCol1 = [
      { seatNumber: 'A1', status: 'available' }, { seatNumber: 'A2', status: 'available' }, { seatNumber: 'A3', status: 'available' },
      { seatNumber: 'A4', status: 'available' }, { seatNumber: 'A5', status: 'available' }, { seatNumber: 'A6', status: 'available' },
      { seatNumber: 'A7', status: 'available' }, { seatNumber: 'A8', status: 'available' }, { seatNumber: 'A9', status: 'booked' },
      { seatNumber: 'A10', status: 'available' }, { seatNumber: 'B1', status: 'available' }, { seatNumber: 'B2', status: 'booked' },
      { seatNumber: 'B3', status: 'available' }, { seatNumber: 'B4', status: 'booked' }, { seatNumber: 'B5', status: 'available' },
      { seatNumber: 'B6', status: 'available' }, { seatNumber: 'B7', status: 'available' }, { seatNumber: 'B8', status: 'booked' },
      { seatNumber: 'B9', status: 'booked' }, { seatNumber: 'B10', status: 'available' }, { seatNumber: 'C1', status: 'available' },
      { seatNumber: 'C2', status: 'available' }, { seatNumber: 'C3', status: 'available' }, { seatNumber: 'C4', status: 'booked' },
      { seatNumber: 'C5', status: 'available' }, { seatNumber: 'C6', status: 'available' }, { seatNumber: 'C7', status: 'available' },
      { seatNumber: 'C8', status: 'available' }, { seatNumber: 'C9', status: 'available' }, { seatNumber: 'C10', status: 'available' },
      // Add other rows here
    ];
    const seatsCol2 = [
        { seatNumber: 'A11', status: 'available' }, { seatNumber: 'A12', status: 'available' }, { seatNumber: 'A13', status: 'available' },
        { seatNumber: 'A14', status: 'available' }, { seatNumber: 'A15', status: 'available' }, { seatNumber: 'A16', status: 'available' },
        { seatNumber: 'A17', status: 'available' }, { seatNumber: 'A18', status: 'available' }, { seatNumber: 'A19', status: 'booked' },
        { seatNumber: 'A20', status: 'available' }, { seatNumber: 'B11', status: 'available' }, { seatNumber: 'B12', status: 'booked' },
        { seatNumber: 'B13', status: 'available' }, { seatNumber: 'B14', status: 'booked' }, { seatNumber: 'B15', status: 'available' },
        { seatNumber: 'B16', status: 'available' }, { seatNumber: 'B17', status: 'available' }, { seatNumber: 'B18', status: 'booked' },
        { seatNumber: 'B19', status: 'booked' }, { seatNumber: 'B20', status: 'available' }, { seatNumber: 'C11', status: 'available' },
        { seatNumber: 'C12', status: 'available' }, { seatNumber: 'C13', status: 'available' }, { seatNumber: 'C14', status: 'booked' },
        { seatNumber: 'C15', status: 'available' }, { seatNumber: 'C16', status: 'available' }, { seatNumber: 'C17', status: 'available' },
        { seatNumber: 'C18', status: 'available' }, { seatNumber: 'C19', status: 'available' }, { seatNumber: 'C20', status: 'available' },
        // Add other rows here
      ];
  
      return (
        <div className="mapA">
            <div className="mapA-col1">
                <CustomSeat 
                    items={seatsCol1} 
                    selectedSeats={selectedSeats} 
                    onSeatSelect={onSeatSelect} 
                    itemsPerRow={10} 
                />
            </div>
            <div className="mapA-col2">
                <CustomSeat 
                    items={seatsCol2} 
                    selectedSeats={selectedSeats} 
                    onSeatSelect={onSeatSelect} 
                    itemsPerRow={10} 
                />
            </div>
        </div>
    );
};

export default MapA;
