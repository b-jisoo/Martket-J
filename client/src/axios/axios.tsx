import axios from "axios";

/**
 *  baseURL이 https://martket-j.herokuapp.com인 aixos
 */
export default axios.create({
  baseURL: "https://martket-j.herokuapp.com",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Cache: "no-cache",
  },
});
