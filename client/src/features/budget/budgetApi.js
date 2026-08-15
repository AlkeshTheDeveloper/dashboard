import api from "../../api/axios";

export const getBudget = async ({ month, year }) => {
  const response = await api.get("/budget", {
    params: {
      month,
      year,
    },
  });

  return response.data.data;
};

export const saveBudget = async (data) => {
  const response = await api.post("/budget", data);

  return response.data.data;
};
