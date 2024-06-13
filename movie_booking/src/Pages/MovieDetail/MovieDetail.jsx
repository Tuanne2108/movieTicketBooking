import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as movieService from "../../services/MovieService";
import './MovieDetail.css';

export const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieSelectedId, setMovieSelectedId] = useState(null);
  // take id from URL 
  useEffect(() => {
    const pathname = window.location.pathname;
    const pathParts = pathname.split('/');
    const movieId = pathParts[pathParts.length - 1];

    console.log('Selected Movie ID page Movie-Detail:', movieId);
    setMovieSelectedId(movieId);
    movieService.getMovieById(movieId)
    .then((res) => {
        if(res.data) {
            console.log("RES_1: ", res.data);
            setSelectedMovie(res.data);
        }
    })
    .catch((err) => {
        console.log("Can't get the ID")
    });

  }, []);


  //   take URL id save it to movieSelectedId
  useEffect(() => {
    if (movieSelectedId) {
        console.log('movieSelectedId: ', movieSelectedId);

        movieService.getMovieById(movieSelectedId)
            .then((res) => {
                if (res.data) {
                    console.log("RES: ", res.data);
                    setSelectedMovie(res.data);
                }
            })
            .catch((err) => {
                console.log("Can't get the id from URL");
            });
    }
}, [movieSelectedId]);


  return (
    <div className="MovieDetails">
      {selectedMovie && (<div className="MovieDetailsContainer">
        <div className="titleContainer">
          <h1>NEWS</h1>
          <h2 className="Duration">{selectedMovie.title}</h2>
        </div>
        <div className="detailContainer">
          <span>{selectedMovie.releaseDate} | FRESHMEN </span>
          <img src={selectedMovie.posterUrl} />
        </div>
        <div className="descriptionContainer">
          <span>{selectedMovie.description}</span>
        </div>
        
      </div>)}
    </div>
  );
};
