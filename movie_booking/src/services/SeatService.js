import { seatApi } from ".";

export const createSeat = async (seat) => {
  const res = await seatApi.post("/get-theaters/:theaterId/get-show/:showtimeId/get-all-seats", seat);
  return res.data;
};
export const getAllSeat = async () => {
  const res = await seatApi.get("/get-theaters/:theaterId/get-show/:showtimeId/get-all-seats");
  return res.data;
};
export const getSeatById = async (id) => {
  const res = await seatApi.get(`/get-seat/${id}`);
  return res.data;
};
export const updateSeat = async (id, seat) => {
  const res = await seatApi.put(`/update-seat/${id}`, seat);
  return res.data;
};
export const deleteSeat = async (id) => {
  const res = await seatApi.delete(`/delete-seat/${id}`);
  return res.data;
};
export const deleteAllSeats = async (selectedIds) => {
  const res = await seatApi.delete("/delete-all-seats", { data: { ids: selectedIds } });
  return res.data;
};
