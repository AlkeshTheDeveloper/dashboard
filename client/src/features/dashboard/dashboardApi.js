import api from "../../api/axios";

export const getDashboard = async (year) => {
  const response = await api.get("/dashboard", {
    params: { year },
  });

  return response.data.data;
};