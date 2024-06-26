import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import * as movieService from "../../services/MovieService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faEarth, faTag } from "@fortawesome/free-solid-svg-icons";
import "./MovieDetail.css";

export const MovieDetail = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieSelectedId, setMovieSelectedId] = useState(null);

  useEffect(() => {
    const pathname = window.location.pathname;
    const pathParts = pathname.split("/");
    const movieId = pathParts[pathParts.length - 1];

    console.log("Selected Movie ID page Movie-Detail:", movieId);
    setMovieSelectedId(movieId);
    movieService
      .getMovieById(movieId)
      .then((res) => {
        if (res.data) {
          console.log("RES_1: ", res.data);
          setSelectedMovie(res.data);
        }
      })
      .catch((err) => {
        console.log("Can't get the ID");
      });
  }, []);

  useEffect(() => {
    if (movieSelectedId) {
      console.log("movieSelectedId: ", movieSelectedId);

      movieService
        .getMovieById(movieSelectedId)
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

  //format release date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  return (
    <Container className="MovieDetails">
      {selectedMovie && (
        <Row className="MovieDetailsContainer">
          <Col md={5} className="leftColumn">
            <img
              src={selectedMovie.posterUrl}
              alt={`${selectedMovie.title} poster`}
              className="img-fluid"
            />
          </Col>
          <Col md={7} className="rightColumn">
            <div className="titleContainer">
              <label>
                <h1 className="Title">{selectedMovie.title}</h1>
              </label>
            </div>
            <div className="movieInfo">
              <ul>
                <li>
                  <FontAwesomeIcon icon={faTag} />
                  <span>{selectedMovie.typeOfMovie}</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faClock} />
                  <span>{selectedMovie.duration} min</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faEarth} />
                  <span>{selectedMovie.country}</span>
                </li>
              </ul>
            </div>
            <div className="movieDescription">
              <h2>Description</h2>
              <ul>
                <li>
                  <label>Director:</label>
                  <span>{selectedMovie.director}</span>
                </li>
                <li>
                  <label>Cast:</label>
                  <span>
                    {selectedMovie.actors.map((actor, index) => (
                      <span key={index}>
                        {actor}
                        {index !== selectedMovie.actors.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </span>
                </li>
                <li>
                  <label>Release Date:</label>
                  <span>{formatDate(selectedMovie.releaseDate)}</span>
                </li>
              </ul>
            </div>
            <div className="movieContent">
              <h2>Content</h2>
              <span>{selectedMovie.description}</span>
            </div>
            {selectedMovie.trailerUrl && (
              <div className="trailerContainer">
                <h2>Trailer</h2>
                <iframe
                  className="trailerIframe"
                  src={`https://www.youtube.com/embed/${new URL(
                    selectedMovie.trailerUrl
                  ).searchParams.get("v")}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Movie Trailer"
                ></iframe>
              </div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
};
