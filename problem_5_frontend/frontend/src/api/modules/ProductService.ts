import { Product } from "../../types";
import axiosInstance from "../apiInstance";
import { PRODUCTS_API } from "../route.api";

export const ProductServiceApi = {
  getAllLists: async (page = 1, limit = 10, query: string = '',userId:string) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await axiosInstance.get(`${PRODUCTS_API}`, {
        params: {
          page,
          limit,
          search:query,
          userId:userId
        },
        withCredentials: true,
      });
      if (res.data) return res.data;
      return null;
    } catch (error) {
      throw error;
    }
  },
  

  getDetail: async (email: string, password: string, fullName: string) => {
    try {
      const res = await axiosInstance.post(`${PRODUCTS_API}/register`, { email, password, fullName }, {
        withCredentials: true,
      });
      if (res.data) return res.data;
      return null;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
  create: async (name: string, description: string, price: number,category:string,stock:string,userId:string) => {
    try {
      const res = await axiosInstance.post(`${PRODUCTS_API}`, {name,description,price,category,stock,userId}, {
        withCredentials: true,
      });
      if (res.data) return res.data;
      return null;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
  update: async (updateProduct: any,idProduct:string) => {
    try {
      const res = await axiosInstance.patch(`${PRODUCTS_API}/${idProduct}`, {...updateProduct}, {
        withCredentials: true,
      });
      if (res.data) return res.data;
      return null;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
  delete: async (ids:[string]) => {
    try {
      const res = await axiosInstance({
        method: 'delete',
        url: `${PRODUCTS_API}`,
        data: { ids },
        withCredentials: true,
      });
      if (res.data) return res.data;
      return null;
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  },
};
