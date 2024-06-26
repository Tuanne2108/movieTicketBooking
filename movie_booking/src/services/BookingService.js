import { bookingApi } from ".";

export const createBooking = async (booking) => {
  const res = await bookingApi.post("/create-booking", booking);
  return res.data;
};

export const getAllBookings = async () => {
  const res = await bookingApi.get("/get-bookings");
  return res.data;
};

export const getBookingById = async (id) => {
  const res = await bookingApi.get(`/get-booking-byId/${id}`);
  return res.data;
};

export const updateBooking = async (id, booking) => {
  const res = await bookingApi.put(`/update-booking/${id}`, booking);
  return res.data;
};

export const deleteBooking = async (id) => {
  const res = await bookingApi.delete(`/delete-booking/${id}`);
  return res.data;
};
