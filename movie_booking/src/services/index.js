import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4001/api/movie/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
