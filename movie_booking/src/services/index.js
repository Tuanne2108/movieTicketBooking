import axios from "axios";

export const movieApi = axios.create({
  baseURL: "http://localhost:4001/api/movie/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const userApi = axios.create({
  baseURL: "http://localhost:4001/api/user/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const showApi = axios.create({
  baseURL: "http://localhost:4001/api/show/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const theaterApi = axios.create({
  baseURL: "http://localhost:4001/api/theater/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const bookingApi = axios.create({
  baseURL: "http://localhost:4001/api/booking/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const seatApi = axios.create({
  baseURL: "http://localhost:4001/api/seat/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});