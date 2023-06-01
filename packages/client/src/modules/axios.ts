import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.API_URL ?? "https://localhost:3008",
  headers: {
    "Content-Type": "application/json",
  },
});
