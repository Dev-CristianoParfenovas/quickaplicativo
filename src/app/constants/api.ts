import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.200.57:8081",
});

export default api;
