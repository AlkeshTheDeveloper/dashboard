import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
 const persistedState = localStorage.getItem("persist:root");

if (persistedState) {
  const parsedState = JSON.parse(persistedState);

  if (parsedState.auth) {
    const auth = JSON.parse(parsedState.auth);
    const token = auth.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
}

  return config;
});

export default api;