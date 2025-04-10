import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance.js";

export const useAuthStore = create((set) => ({
  authUser: null,
  logout: () => {
    try {
      axiosInstance.post("/logout");
    } catch (error) {
      console.log(error);
    }
  },
}));
