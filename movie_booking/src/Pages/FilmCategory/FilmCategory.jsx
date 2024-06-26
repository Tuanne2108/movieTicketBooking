import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../../Components/SliderItems/SliderFilm";
import Poster from "../../Components/Assets/Poster-NhaBaNu.png";
import Voucher from "../../Components/Assets/VoucherSlider.png";
import News from "../../Components/News/News";
import "./styleFilmCategory.css";
import * as movieService from "../../services/MovieService";
import { Button } from "antd";

const FilmCategory = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        movieService
            .getAllMovies()
            .then((res) => {
                if (res.data) {
                    setMovies(res.data);
                } else {
                    setError("Expected an object containing a data array");
                }
            })
            .catch((err) => {
                setError(`Error fetching movies: ${err.message}`);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSeeDetails = (movieId) => {
        window.location.href = `/movie/${movieId}`;
    };

    const handleBookingTicket = (movieId) => {
        window.location.href = `/booking/${movieId}`;
    };

    const itemsVoucher = Array.from({ length: 4 }, (_, index) => index + 1);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const comedyMovies = movies.filter((movie) => movie.typeOfMovie === "Comedy");

    return (
        <div className="Cnema main-body">
            <div className="hotMovieComedy">
                <Slider slidesToShow={4} slidesToScroll={1}>
                    {comedyMovies.slice(0, 9).map((movie) => (
                        <div key={movie._id} className="ContainerSliderCnema">
                            <div className="poster-img">
                                <div className="imgAndAfter">
                                    <img
                                        src={
                                            movie.posterUrl ||
                                            "default-poster-url.jpg"
                                        }
                                        alt={movie.title}
                                    />
                                </div>
                            </div>
                            <div className="title">
                                <h3>{movie.title}</h3>
                            </div>
                            <div className="buttonSDBYTN">
                                <button
                                    className="SD"
                                    onClick={() => handleSeeDetails(movie._id)}>
                                    See Details
                                </button>
                                <button
                                    className="BYTN"
                                    onClick={() =>
                                        handleBookingTicket(movie._id)
                                    }>
                                    Book Your Ticket Now
                                </button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default FilmCategory;
