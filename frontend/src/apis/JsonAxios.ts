import baseAxios from "axios";
// import { store } from "app/store";

export const baseURL = process.env.REACT_APP_API_BASE_URL;

const Axios = baseAxios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Axios.interceptors.request.use(
//   (config) => {
//     const accessToken = store.getState().auth.accessToken;
//     if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

export default Axios;
