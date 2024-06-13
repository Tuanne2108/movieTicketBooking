import { showApi } from ".";

export const createShow = async (show) => {
  const res = await showApi.post("/create-show", show);
  return res.data;
};

export const getAllShows = async () => {
  const res = await showApi.get("/get-all-shows");
  return res.data;
};

export const getShowById = async (id) => {
  const res = await showApi.get(`/get-show/${id}`);
  return res.data;
};

export const updateShow = async (id, show) => {
  const res = await showApi.put(`/update-show/${id}`, show);
  return res.data;
};

export const deleteShow = async (id) => {
  const res = await showApi.delete(`/delete-show/${id}`);
  return res.data;
};
