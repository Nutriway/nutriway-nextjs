import axios from "axios";

const axiosAuthenticated = (userJwt: String) => {
  const jwt = sessionStorage.getItem("@nutriplan-token");

  return axios.create({
    baseURL: process.env.REACT_APP_PROD || "http://localhost:1337/api/",
    timeout: 100000,
    headers: { Authorization: "Bearer " + (userJwt || jwt) },
  });
};

export default axiosAuthenticated;
