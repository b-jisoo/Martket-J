import axios from "axios";

/**
 *  baseURL이 https://martket-j.herokuapp.com인 aixos
 */
export default axios.create({
  baseURL: "https://martket-j.herokuapp.com",
  withCredentials: true,
});
