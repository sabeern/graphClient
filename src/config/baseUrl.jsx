import axios from "axios";

export const instance = axios.create({
  baseURL: "https://graph-2inq.onrender.com",
});
