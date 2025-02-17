import axiosInstance from "../apiInstance";
import { AUTH_API } from "../route.api";

export const AuthServieApi = {
  login: async (email: string, password: string) => {
    try {
      const res = await axiosInstance.post(`${AUTH_API}/login`, { email, password }, {
        withCredentials: true,
      });
      if (res.data) return res.data;
      return null;
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Ném lỗi để bên ngoài có thể bắt và xử lý
    }
  },

  register: async (email: string, password: string, fullName: string) => {
    try {
      const res = await axiosInstance.post(`${AUTH_API}/register`, { email, password, fullName }, {
        withCredentials: true,
      });
      if (res.data) return res.data;
      return null;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error; // Ném lỗi để bên ngoài có thể bắt và xử lý
    }
  }
};
