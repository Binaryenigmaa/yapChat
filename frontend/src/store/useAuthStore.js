import { create } from "zustand";
import { axiosInstance } from "../utils/axiosInstance.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  login: async (userInfo) => {
    try {
      const response = await axiosInstance.post("/auth/login", userInfo);
      set({ authUser: response.data });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  signUp: async (userInfo) => {
    try {
      const response = await axiosInstance.post("/auth/signup", userInfo);
      set({ authUser: response.data });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  },
  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });
      toast.success("Welcome Back!😃");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(`Error in checkAuth frontend`, error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(response.data.message);
    }
  },
  updateProfile: async (profilepic) => {
    set({ isUpdatingProfile: true });
    try {
      const response = await axiosInstance.put(
        "/auth/profile-update",
        profilepic
      );
      set({ authUser: response.data });
      toast.success(response.data.message);
    } catch (error) {
      console.log(`Error in updateProfile store`, error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
