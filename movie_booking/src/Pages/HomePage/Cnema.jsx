import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "../../Components/SliderItems/Slider";
import Poster from "../../Components/Assets/Poster-NhaBaNu.png";
import Voucher from "../../Components/Assets/VoucherSlider.png";
import News from "../../Components/News/News";
import "./Cnema.css";
import * as movieService from "../../services/MovieService";

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

  const handleSeeDetails = (movieId) => {
    navigate(`/movie/get-movie/${movieId}`);
  };

  const handleBookingTicket = (movieId) => {
    window.location.href = `/booking/${movieId}`;
  };

  const itemsVoucher = Array.from({ length: 4 }, (_, index) => index + 1);
  const itemsYMI = Array.from({ length: 9 }, (_, index) => index + 1);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="Cnema main-body">
      <div className="hotMovieContainer">
        <Slider slidesToShow={4} slidesToScroll={2}>
          {movies.map((movie) => (
            <div key={movie._id} className="ContainerSliderCnema">
              <div className="poster-img">
                <img
                  src={movie.posterUrl || "default-poster-url.jpg"}
                  alt={movie.title}
                />
              </div>
              <div className="title">
                <h2>{movie.title}</h2>
              </div>
              <div className="buttonSDBYTN">
                <button
                  className="SD"
                  onClick={() => handleSeeDetails(movie._id)}
                >
                  See Details
                </button>
                <button
                  className="BYTN"
                  onClick={() => handleBookingTicket(movie._id)}
                >
                  Book Your Ticket Now
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="voucherContainer">
        <Slider slidesToShow={1} slidesToScroll={1}>
          {itemsVoucher.map((item) => (
            <div key={item} className="ContainerVoucherCnema">
              <div className="voucher-img">
                <img src={Voucher} alt="Voucher" />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <div className="newsContainer">
        <News />
      </div>
      <div className="mayInterestedContainer">
        <Slider slidesToShow={3} slidesToScroll={2}>
          {itemsYMI.map((item) => (
            <div key={item} className="ContainerYouMayInterest">
              <div className="poster-img">
                <img src={Poster} alt="Poster" />
              </div>
              <div className="title">
                <h2>Nha Ba Nu</h2>
              </div>
              <div className="buttonSDBYTN">
                <button className="SD">See Detail</button>
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
