import { showApi } from "."; 

export const createShow = async (showData) => {
  const res = await showApi.post("/create-show", showData);
  return res.data;
};

export const getAllShows = async () => {
  const res = await showApi.get("/get-all-shows");
  return res.data;
};

export const getShowById = async (showId) => {
  const res = await showApi.get(`/get-show/${showId}`);
  return res.data;
};

export const updateShow = async (showId, showData) => {
  const res = await showApi.put(`/update-show/${showId}`, showData);
  return res.data;
};