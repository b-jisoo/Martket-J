import axios from "axios";

/**
 *  baseURL이 http://localhost:4000인 aixos
 */
export default axios.create({
  baseURL: "https://martket-j.herokuapp.com/",
});
