import axios from "axios";

const httpClient = axios.create();

httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  console.log("token: ", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default httpClient;