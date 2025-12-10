import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxios = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    //* Request interceptor
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      if (user) {
        //* Store JWT from backend
        const token = localStorage.getItem("access-token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    });

    //* Response interceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      (error) => {
        const statusCode = error?.response?.status;

        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxios;
