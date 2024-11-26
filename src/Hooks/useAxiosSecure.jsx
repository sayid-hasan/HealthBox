import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOutUser } = useContext(AuthContext);
  // request interceptor to send headers in every api request
  // old
  // axiosSecure.interceptors.request.use(
  //   function (request) {
  //     const token = localStorage.getItem("access-token");
  //     // Edit request config
  //     console.log("hitting in interceptror", token);
  //     request.headers.authorization = `Bearer ${token}`;
  //     return request;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );
  // new
  axiosSecure.interceptors.request.use(
    async function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  // resposne interceptor
  // axiosSecure.interceptors.response.use(
  //   function (response) {
  //     return response;
  //   },
  //   async (error) => {
  //     const status = error?.response?.status;
  //     console.log("status error in interceptors", error);
  //     if (status === 401 || status === 403) {
  //       await logOutUser();
  //       navigate("/login");
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  return axiosSecure;
};

export default useAxiosSecure;
