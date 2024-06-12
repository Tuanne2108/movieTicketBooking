import { bookingApi } from "."; 

export const createBooking = async (bookingData) => {
  const res = await bookingApi.post("/create-booking", bookingData);
  return res.data;
};

export const getAllBookings = async () => {
  const res = await bookingApi.get("/get-bookings");
  return res.data;
};

export const getBookingsByUserId = async (userId) => {
  const res = await bookingApi.get(`/get-booking-byUserId/${userId}`);
  return res.data;
};

export const getBookingById = async (bookingId) => {
  const res = await bookingApi.get(`/get-booking/${bookingId}`);
  return res.data;
};