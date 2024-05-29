import { api } from ".";

export const createMovie = async (movie) => {
  const res = await api.post("/create-movie", movie);
  return res.data;
};
export const getAllMovies = async () => {
  const res = await api.get("/get-all-movies");
  return res.data;
};
export const getMovieById = async (id) => {
  const res = await api.get(`/get-movie/${id}`);
  return res.data;
};
export const updateMovie = async (id, movie) => {
  const res = await api.put(`/update-movie/${id}`, movie);
  return res.data;
};
export const deleteMovie = async (id) => {
  const res = await api.delete(`/delete-movie/${id}`);
  return res.data;
};
export const deleteAllMovies = async (selectedIds) => {
  const res = await api.delete("/delete-all-movies", { data: { ids: selectedIds } });
  return res.data;
};
