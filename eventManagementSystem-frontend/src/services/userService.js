import api from "./api";

export const createUser = async (userData) => {
  try {
    const res = await api.post("/users", userData);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to create user";
  }
};

export const getUserById = async (id) => {
  try {
    const res = await api.get(`/users/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "User not found";
  }
};

export const loginByEmail = async (email) => {
  try {
    const res = await api.get(`/users?email=${email}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Login failed";
  }
};

