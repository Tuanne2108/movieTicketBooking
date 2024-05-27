import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as movieService from "../../services/MovieService";

export const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    movieService
      .getMovieById(id)
      .then((res) => {
        if (res.data) {
          setMovie(res.data);
        } else {
          setError("Movie not found");
        }
      })
      .catch((err) => {
        setError(`Error fetching movie: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>No movie data</div>;
  }

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
    </div>
  );
};
