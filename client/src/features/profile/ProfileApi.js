import api from "../../api/axios";

export const updateProfile = async (data) => {
  const response = await api.put("/users/profile", data);

  return response.data.data;
};
