import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

      if (auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
    }
  }

  return config;
});

export default api;