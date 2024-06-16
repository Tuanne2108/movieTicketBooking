import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../../Components/SliderItems/SliderFilm";
import Poster from "../../Components/Assets/Poster-NhaBaNu.png";
import Voucher from "../../Components/Assets/VoucherSlider.png";
import News from "../../Components/News/News";
import "./Cnema.css";
import * as movieService from "../../services/MovieService";
import { Button } from "antd";

const Cnema = () => {
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

    // chưa chuyển hướng sang trang movie details
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

    return (
        <div className="Cnema main-body">
          <h1 style={{margin:'10px', fontWeight:'bold'}}>Currently Showing Movies</h1>
            <div className="hotMovieContainer">
                <Slider slidesToShow={4} slidesToScroll={1}>
                    {movies.slice(0, 9).map((movie) => (
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

            <div className="voucherContainer">
              <h1 style={{marginTop:'20px', fontWeight:'bold', paddingLeft:'50px', textAlign:'center'}}>Vouchers</h1>
                <Slider
                    slidesToShow={1}
                    slidesToScroll={1}
                    autoplay={true}
                    autoplaySpeed={3000}>
                    {itemsVoucher.map((item) => (
                        <div key={item} className="ContainerVoucherCnema">
                            <div className="voucher-img">
                                <img
                                    src={
                                        "https://free.vector6.com/wp-content/uploads/2020/11/211029203-Vector-banner-giang-sinh-lung-linh-1024x613.jpg"
                                    }
                                    alt={`Voucher ${item}`}
                                />
                                <div className="voucher-overlay">
                                    <Button
                                        type="primary"
                                        style={{ marginTop: "5px" }}>
                                        <a
                                            href={`/voucher/${item}`}
                                            className="voucher-link">
                                            View Offer
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="newsContainer">
                <News />
            </div>
            <div className="mayInterestedContainer">
              <h1 style={{marginTop:'20px', fontWeight:'bold', paddingLeft:'50px', textAlign:'center'}}>Incoming Movies</h1>
                <Slider slidesToShow={3} slidesToScroll={2}>
                    {movies.slice(10).map((movie) => (
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
                                <button className="CM">Coming Soon</button>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Cnema;
