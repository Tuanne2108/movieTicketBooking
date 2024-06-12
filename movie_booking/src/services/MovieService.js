import { movieApi } from ".";

export const createMovie = async (movie) => {
  const res = await movieApi.post("/create-movie", movie);
  return res.data;
};
export const getAllMovies = async () => {
  const res = await movieApi.get("/get-all-movies");
  return res.data;
};
export const getMovieById = async (id) => {
  const res = await movieApi.get(`/get-movie/${id}`);
  return res.data;
};
export const updateMovie = async (id, movie) => {
  const res = await movieApi.put(`/update-movie/${id}`, movie);
  return res.data;
};
export const deleteMovie = async (id) => {
  const res = await movieApi.delete(`/delete-movie/${id}`);
  return res.data;
};
export const deleteAllMovies = async (selectedIds) => {
  const res = await movieApi.delete("/delete-all-movies", { data: { ids: selectedIds } });
  return res.data;
};
