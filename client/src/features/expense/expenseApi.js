import api from "../../api/axios";

export const getExpenses = async (filters) => {
  const response = await api.get("/expenses", {
    params: filters,
  });

  return response.data.data;
};

export const createExpense = async (data) => {
  const response = await api.post("/expenses", data);

  return response.data.data;
};

export const updateExpense = async ({ id, data }) => {
  const response = await api.put(`/expenses/${id}`, data);

  return response.data.data;
};

export const deleteExpense = async (id) => {
  const response = await api.delete(`/expenses/${id}`);

  return response.data.data;
};
