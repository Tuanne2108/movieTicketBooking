import { theaterApi } from "."; 

export const createTheater = async (theaterData) => {
  const res = await theaterApi.post("/create-theater", theaterData);
  return res.data;
};

export const getAllTheaters = async () => {
  const res = await theaterApi.get("/get-all-theaters");
  return res.data;
};

export const getTheaterById = async (theaterId) => {
  const res = await theaterApi.get(`/get-theater/${theaterId}`);
  return res.data;
};

export const updateTheater = async (theaterId, theaterData) => {
  const res = await theaterApi.put(`/update-theater/${theaterId}`, theaterData);
  return res.data;
};
export const deleteTheater = async (theaterId) => {
  const res = await theaterApi.delete(`/delete-theater/${theaterId}`);
  return res.data;
};