import axiosInstance from "../apiInstance";
import { USER_API } from "../route.api";

export const UserServiceApi = {
  getDetail: async (idUser:string) => {
    try {
      const res = await axiosInstance.get(`${USER_API}/${idUser}`, {
        withCredentials: true,
      });
      if (res.data) return res.data;
      return null;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },

  register: async (email: string, password: string, fullName: string) => {
    try {
      const res = await axiosInstance.post(`${USER_API}/register`, { email, password, fullName }, {
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
